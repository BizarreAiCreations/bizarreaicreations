import { loadSite } from "@/lib/content";

export default function AboutPage() {
  const site = loadSite();
  const about = site?.pages.find(p => p.type === 'about') || site?.pages.find(p => /hakk/i.test(p.title || ''));
  if (!site || !about) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-16">
        <h1 className="text-2xl font-semibold">About</h1>
        <p className="text-gray-600 mt-2">Content not found. Try running npm run scrape first.</p>
      </div>
    );
  }
  return (
    <div className="max-w-6xl mx-auto px-4 py-16 space-y-6">
      <h1 className="text-3xl font-semibold">{about.title || 'About'}</h1>
      {about.bio?.map((p: string, i: number) => (
        <p key={i} className="text-gray-700">{p}</p>
      ))}
    </div>
  );
}
