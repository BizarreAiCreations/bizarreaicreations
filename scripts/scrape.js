#!/usr/bin/env node
import axios from 'axios';
import * as cheerio from 'cheerio';
import fs from 'fs';
import path from 'path';

const BASE = 'https://www.abdulkadiraltinel.com.tr';
const OUT_DIR = path.join(process.cwd(), 'content');
const OUT_FILE = path.join(OUT_DIR, 'site.json');

function toAbsolute(url) {
  if (!url) return url;
  if (url.startsWith('http')) return url;
  if (url.startsWith('//')) return 'https:' + url;
  if (url.startsWith('/')) return BASE + url;
  return BASE + '/' + url;
}

function extractContact($) {
  const contact = { phones: [], emails: [], addresses: [], socials: {} };
  $('a[href^="tel:"]').each((_, a) => {
    const href = $(a).attr('href');
    if (href) contact.phones.push(href.replace('tel:', '').trim());
  });
  $('a[href^="mailto:"]').each((_, a) => {
    const href = $(a).attr('href');
    if (href) contact.emails.push(href.replace('mailto:', '').trim());
  });
  const text = $('body').text();
  const addressCandidates = [];
  $('address').each((_, el) => addressCandidates.push($(el).text().trim()));
  // Heuristic: lines with city keywords
  const lines = text.split('\n').map(s => s.trim()).filter(Boolean);
  const cityRe = /(istanbul|ankara|izmir|sok|cad|mah|no\:|kat\:|bulvar|street|avenue)/i;
  for (const line of lines) {
    if (cityRe.test(line) && line.length > 10) addressCandidates.push(line);
  }
  contact.addresses = Array.from(new Set(addressCandidates)).slice(0, 5);

  // Socials
  $('a[href*="facebook.com"]').each((_, a) => contact.socials.facebook = $(a).attr('href'));
  $('a[href*="instagram.com"]').each((_, a) => contact.socials.instagram = $(a).attr('href'));
  $('a[href*="twitter.com"], a[href*="x.com"]').each((_, a) => contact.socials.twitter = $(a).attr('href'));
  $('a[href*="linkedin.com"]').each((_, a) => contact.socials.linkedin = $(a).attr('href'));
  return contact;
}

function extractImages($) {
  const images = [];
  $('img').each((_, img) => {
    let src = $(img).attr('src') || $(img).attr('data-src');
    const alt = $(img).attr('alt') || '';
    if (!src) return;
    src = toAbsolute(src);
    images.push({ src, alt });
  });
  return images;
}

function extractSections($) {
  const sections = [];
  // Build sections from headings
  const nodes = $('h1, h2, h3, p, li');
  let current = null;
  nodes.each((_, el) => {
    const tag = el.tagName.toLowerCase();
    const text = cheerio.load('<div></div>')(el).text().trim();
    if (!text) return;
    if (tag === 'h1' || tag === 'h2') {
      if (current) sections.push(current);
      current = { title: text, items: [] };
    } else if (tag === 'h3') {
      if (!current) current = { title: 'Section', items: [] };
      current.items.push({ type: 'subheading', text });
    } else if (tag === 'li') {
      if (!current) current = { title: 'Section', items: [] };
      current.items.push({ type: 'bullet', text });
    } else if (tag === 'p') {
      if (!current) current = { title: 'Section', items: [] };
      current.items.push({ type: 'paragraph', text });
    }
  });
  if (current) sections.push(current);
  return sections.slice(0, 12);
}

function classifyPage($, url, title) {
  const u = url.toLowerCase();
  const t = (title || '').toLowerCase();
  const text = $('body').text().toLowerCase();
  const has = (re) => re.test(u) || re.test(t) || re.test(text);
  if (has(/ilet[iı]şim|contact|randevu/)) return 'contact';
  if (has(/hakk[ıi]mda|hakk[ıi]m[ıi]zda|about|özgeçmiş|cv/)) return 'about';
  if (has(/hizmet|tedavi|uygulama|services?/)) return 'services';
  return 'page';
}

function extractAbout($) {
  // Collect meaningful paragraphs from the main content area
  const paras = [];
  $('main p, .content p, .post-content p, .page-content p, article p, .entry-content p, .container p').each((_, p) => {
    const txt = $(p).text().trim();
    if (txt && txt.length > 80) paras.push(txt);
  });
  // De-duplicate
  return Array.from(new Set(paras)).slice(0, 24);
}

function extractServices($, baseUrl) {
  const services = [];
  // Pattern A: cards or list items with links
  $('a').each((_, a) => {
    const href = $(a).attr('href');
    let title = $(a).text().trim();
    if (!href) return;
    const abs = toAbsolute(href);
    if (!abs.startsWith(BASE)) return;
    // Keep only service-like anchors
    const t = title.toLowerCase();
    if (/hizmet|tedavi|uygulama|estetik|ameliyat|operation|treatment|service/.test(t)) {
      services.push({ title: title || 'Service', link: abs });
    }
  });
  // Pattern B: heading + paragraph blocks
  $('h2, h3').each((_, h) => {
    const title = $(h).text().trim();
    if (!title) return;
    const t = title.toLowerCase();
    if (!/hizmet|tedavi|uygulama|estetik|ameliyat|operation|treatment|service/.test(t)) return;
    // next sibling paragraphs
    const p = $(h).nextAll('p').slice(0, 2).map((_, el) => $(el).text().trim()).get().filter(Boolean).join(' ');
    services.push({ title, description: p });
  });
  // Clean and unique by title+link
  const map = new Map();
  for (const s of services) {
    const key = (s.title || '') + '|' + (s.link || '');
    if (!map.has(key)) map.set(key, s);
  }
  return Array.from(map.values()).slice(0, 24);
}

async function fetchPage(url) {
  const res = await axios.get(url, { timeout: 20000 });
  const html = res.data;
  const $ = cheerio.load(html);
  const title = $('title').text().trim();
  const description = $('meta[name="description"]').attr('content') || '';
  const type = classifyPage($, url, title);
  const images = extractImages($);
  const contact = extractContact($);

  let bio = undefined;
  let services = undefined;
  if (type === 'about') bio = extractAbout($);
  if (type === 'services') services = extractServices($);

  const links = new Set();
  $('a[href]').each((_, a) => {
    const href = $(a).attr('href');
    if (!href) return;
    if (href.startsWith('#')) return;
    const abs = toAbsolute(href);
    if (abs.startsWith(BASE)) links.add(abs.split('#')[0]);
  });

  const sections = extractSections($);
  return { url, title, description, type, images, contact, bio, services, sections, links: Array.from(links) };
}

async function crawl(startUrl, limit = 8) {
  const visited = new Set();
  const queue = [startUrl];
  const pages = [];

  while (queue.length && pages.length < limit) {
    const url = queue.shift();
    if (!url || visited.has(url)) continue;
    visited.add(url);
    try {
      const page = await fetchPage(url);
      pages.push({ url: page.url, title: page.title, description: page.description, type: page.type, images: page.images, sections: page.sections, bio: page.bio, services: page.services, contact: page.contact });
      for (const l of page.links) {
        if (!visited.has(l) && l.startsWith(BASE)) queue.push(l);
      }
    } catch (e) {
      console.warn('Failed to fetch', url, e.message);
    }
  }
  return pages;
}

async function main() {
  const pages = await crawl(BASE, 10);
  const site = { scrapedAt: new Date().toISOString(), baseUrl: BASE, pages };
  if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR);
  fs.writeFileSync(OUT_FILE, JSON.stringify(site, null, 2), 'utf8');
  console.log(`Scraped ${pages.length} pages -> ${OUT_FILE}`);
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});