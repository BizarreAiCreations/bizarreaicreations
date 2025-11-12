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

function cleanText(s) {
  return (s || '')
    .replace(/\s+/g, ' ')
    .replace(/\u00A0/g, ' ')
    .replace(/cookies?|kvkk|çerez/i, (m) => m.length > 1000 ? '' : m)
    .trim();
}

function extractContact($, $root) {
  const contact = { phones: [], emails: [], addresses: [], socials: {}, map: undefined };
  const scope = $root && $root.length ? $root : $;

  scope('a[href^="tel:"]').each((_, a) => {
    const href = scope(a).attr('href');
    if (href) contact.phones.push(href.replace('tel:', '').trim());
  });
  scope('a[href*="wa.me"], a[href*="whatsapp"]').each((_, a) => {
    const href = scope(a).attr('href');
    if (href) contact.socials.whatsapp = toAbsolute(href);
  });
  scope('a[href^="mailto:"]').each((_, a) => {
    const href = scope(a).attr('href');
    if (href) contact.emails.push(href.replace('mailto:', '').trim());
  });

  // Addresses: try address tags or blocks containing known words
  const addrBlocks = [];
  scope('address, .address, [class*="adres"], [class*="address"]').each((_, el) => addrBlocks.push(cleanText(scope(el).text())));
  const bodyText = cleanText(scope('body').text()) || cleanText(scope.text());
  const lines = (bodyText || '').split(/\n|\.|\u2022/).map(s => cleanText(s)).filter(Boolean);
  const cityRe = /(istanbul|ankara|izmir|kad[ıi]k[öo]y|beşiktaş|üsküdar|mah\.|cad\.|sok\.|no\:|kat\:|bulvar|street|avenue|beykoz|ataşehir)/i;
  for (const line of lines) {
    if (cityRe.test(line) && line.length > 12) addrBlocks.push(line);
  }
  contact.addresses = Array.from(new Set(addrBlocks)).slice(0, 5);

  // Socials
  scope('a[href*="facebook.com"]').each((_, a) => contact.socials.facebook = scope(a).attr('href'));
  scope('a[href*="instagram.com"]').each((_, a) => contact.socials.instagram = scope(a).attr('href'));
  scope('a[href*="twitter.com"], a[href*="x.com"]').each((_, a) => contact.socials.twitter = scope(a).attr('href'));
  scope('a[href*="linkedin.com"]').each((_, a) => contact.socials.linkedin = scope(a).attr('href'));

  // Map iframe
  const mapSrc = scope('iframe[src*="google.com/maps"], iframe[src*="maps.google"]').attr('src');
  if (mapSrc) contact.map = toAbsolute(mapSrc);

  // Dedup phones/emails
  contact.phones = Array.from(new Set(contact.phones));
  contact.emails = Array.from(new Set(contact.emails));

  return contact;
}

function extractImages($, $root) {
  const scope = $root && $root.length ? $root : $;
  const images = [];
  scope('img').each((_, img) => {
    let src = scope(img).attr('src') || scope(img).attr('data-src') || scope(img).attr('data-lazy-src');
    const alt = scope(img).attr('alt') || '';
    if (!src) return;
    src = toAbsolute(src);
    images.push({ src, alt });
  });
  return images;
}

function classifyPage($, url, title) {
  const u = (url || '').toLowerCase();
  const t = (title || '').toLowerCase();
  const text = ($('body').text() || '').toLowerCase();
  const has = (re) => re.test(u) || re.test(t) || re.test(text);
  if (has(/ilet[iı]şim|contact|randevu/)) return 'contact';
  if (has(/hakk[ıi]mda|hakk[ıi]m[ıi]zda|about|özgeçmiş|cv/)) return 'about';
  if (has(/hizmet|tedavi|uygulama|services?/)) return 'services';
  return 'page';
}

function getMainRoot($) {
  const selectors = [
    'main', '#main', '.site-main', '.entry-content', '.page-content', '.post-content', '.content', 'article', '.elementor', '.container', '.wp-block-group'
  ];
  for (const sel of selectors) {
    const el = $(sel);
    if (el && el.length) return el;
  }
  return $('body');
}

function extractAbout($) {
  const $root = getMainRoot($);
  const paras = [];
  $root.find('h1, h2, h3, p').each((_, el) => {
    const tag = el.tagName?.toLowerCase?.() || '';
    const text = cleanText($(el).text());
    if (!text) return;
    if (tag === 'p' && text.length > 60) paras.push(text);
    if ((tag === 'h1' || tag === 'h2' || tag === 'h3') && /hakk|about|özgeçmiş|cv/i.test(text)) {
      // include following 6 paragraphs
      $(el).nextAll('p').slice(0, 6).each((_, p) => {
        const t = cleanText($(p).text());
        if (t.length > 40) paras.push(t);
      });
    }
  });
  return Array.from(new Set(paras)).slice(0, 40);
}

function extractServices($) {
  const $root = getMainRoot($);
  const services = [];

  // A) Cards with headings and optional text
  $root.find('.card, .service, .hizmet, .service-item, .et_pb_blurb, .elementor-widget, .wp-block-columns .wp-block-column').each((_, block) => {
    const title = cleanText($(block).find('h2, h3, h4, .title, .card-title, .elementor-heading-title').first().text());
    const description = cleanText($(block).find('p').first().text());
    let link = $(block).find('a').first().attr('href');
    if (!title) return;
    const low = title.toLowerCase();
    if (!/hizmet|tedavi|uygulama|estetik|ameliyat|operation|treatment|service/.test(low) && description.length < 20) return;
    if (link) link = toAbsolute(link);
    services.push({ title, description, link });
  });

  // B) Lists with anchors that look like services
  $root.find('ul li a').each((_, a) => {
    const title = cleanText($(a).text());
    let link = $(a).attr('href');
    if (!title || title.length < 3) return;
    const low = title.toLowerCase();
    if (!/hizmet|tedavi|uygulama|estetik|ameliyat|operation|treatment|service/.test(low)) return;
    if (link) link = toAbsolute(link);
    services.push({ title, link });
  });

  // Unique
  const map = new Map();
  for (const s of services) {
    const key = (s.title || '') + '|' + (s.link || '');
    if (!map.has(key)) map.set(key, s);
  }
  const res = Array.from(map.values()).filter(s => s.title && s.title.length > 2);
  return res.slice(0, 36);
}

function extractContactSection($) {
  const $root = getMainRoot($);
  const contact = extractContact($, $root);
  return contact;
}

function extractSections($) {
  const $root = getMainRoot($);
  const sections = [];
  let current = null;
  $root.find('h1, h2, h3, p, li').each((_, el) => {
    const tag = el.tagName?.toLowerCase?.() || '';
    const text = cleanText($(el).text());
    if (!text) return;
    if (tag === 'h1' || tag === 'h2') {
      if (current) sections.push(current);
      current = { title: text, items: [] };
    } else if (tag === 'h3') {
      if (!current) current = { title: 'Bölüm', items: [] };
      current.items.push({ type: 'subheading', text });
    } else if (tag === 'li') {
      if (!current) current = { title: 'Bölüm', items: [] };
      current.items.push({ type: 'bullet', text });
    } else if (tag === 'p') {
      if (!current) current = { title: 'Bölüm', items: [] };
      current.items.push({ type: 'paragraph', text });
    }
  });
  if (current) sections.push(current);
  return sections.slice(0, 12);
}

async function fetchPage(url) {
  const res = await axios.get(url, { timeout: 25000, headers: { 'User-Agent': 'Mozilla/5.0 (Scraper Bot)' } });
  const html = res.data;
  const $ = cheerio.load(html);
  const title = cleanText($('title').text());
  const description = $('meta[name="description"]').attr('content') || '';
  const type = classifyPage($, url, title);
  const images = extractImages($);

  let bio, services, contact;
  if (type === 'about') bio = extractAbout($);
  if (type === 'services') services = extractServices($);
  if (type === 'contact' || type === 'page') contact = extractContactSection($);

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

async function crawl(startUrl, limit = 10) {
  const visited = new Set();
  const queue = [startUrl];
  const pages = [];

  while (queue.length && pages.length < limit) {
    const url = queue.shift();
    if (!url || visited.has(url)) continue;
    visited.add(url);
    try {
      const page = await fetchPage(url);
      pages.push({
        url: page.url,
        title: page.title,
        description: page.description,
        type: page.type,
        images: page.images,
        sections: page.sections,
        bio: page.bio,
        services: page.services,
        contact: page.contact,
      });
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
  const pages = await crawl(BASE, 12);
  const site = { scrapedAt: new Date().toISOString(), baseUrl: BASE, pages };
  if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR);
  fs.writeFileSync(OUT_FILE, JSON.stringify(site, null, 2), 'utf8');
  console.log(`Scraped ${pages.length} pages -> ${OUT_FILE}`);
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});