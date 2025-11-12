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

async function fetchPage(url) {
  const res = await axios.get(url, { timeout: 20000 });
  const html = res.data;
  const $ = cheerio.load(html);
  const title = $('title').text().trim();
  const description = $('meta[name="description"]').attr('content') || '';
  const images = extractImages($);
  const contact = extractContact($);

  const links = new Set();
  $('a[href]').each((_, a) => {
    const href = $(a).attr('href');
    if (!href) return;
    if (href.startsWith('#')) return;
    const abs = toAbsolute(href);
    if (abs.startsWith(BASE)) links.add(abs.split('#')[0]);
  });

  const sections = extractSections($);
  return { url, title, description, images, contact, sections, links: Array.from(links) };
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
      pages.push({ url: page.url, title: page.title, description: page.description, images: page.images, sections: page.sections, contact: page.contact });
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