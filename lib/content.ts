import fs from 'fs';
import path from 'path';

export type Site = {
  scrapedAt?: string;
  baseUrl?: string;
  pages: Array<{
    url: string;
    title: string;
    description?: string;
    type?: 'about' | 'services' | 'contact' | 'page';
    images?: { src: string; alt?: string }[];
    sections?: Array<{ title: string; items: Array<{ type: string; text: string }> }>;
    bio?: string[]; // for about
    services?: Array<{ title: string; description?: string; link?: string }>;
    contact?: { phones?: string[]; emails?: string[]; addresses?: string[]; socials?: Record<string, string> };
  }>;
};

export function loadSite(): Site | null {
  const file = path.join(process.cwd(), 'content', 'site.json');
  if (!fs.existsSync(file)) return null;
  const raw = fs.readFileSync(file, 'utf8');
  return JSON.parse(raw);
}

export function getHomeContent(site: Site | null) {
  if (!site || !site.pages?.length) return null;
  // Prefer base URL page
  const home = site.pages.find(p => p.url === (site.baseUrl || '')) || site.pages[0];
  return home;
}
