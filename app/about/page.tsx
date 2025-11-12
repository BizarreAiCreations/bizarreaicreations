import { loadSite } from "@/lib/content";

export default function AboutPage() {
  const site = loadSite();
  const about = site?.pages.find(p => p.type === 'about') || site?.pages.find(p => /hakk/i.test(p.title || ''));
  if (!site || !about) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-20">
        <h1 className="text-3xl font-semibold">About</h1>
        <p className="text-gray-600 mt-3">Content not found. Try running npm run scrape first.</p>
      </div>
    );
  }
  return (
    <section className="bg-gradient-to-b from-white to-slate-50">
      <div className="max-w-6xl mx-auto px-4 py-20">
        <header className="mb-10">
          <h1 className="text-4xl font-bold tracking-tight">{about.title || 'About'}</h1>
          {about.description && <p className="text-gray-600 mt-2 max-w-3xl">{about.description}</p>}
        </header>
        <div className="grid md:grid-cols-12 gap-10">
          <div className="md:col-span-8 space-y-5">
            {about.bio?.map((p: string, i: number) => (
              <p key={i} className="text-lg leading-8 text-slate-800">{p}</p>
            ))}
          </div>
          <aside className="md:col-span-4 space-y-4">
            <div className="rounded-xl border bg-white p-5 shadow-sm">
              <h3 className="font-semibold mb-2">İletişim</h3>
              <ul className="text-slate-700 space-y-1">
                {about.contact?.phones?.map((p: string, i: number) => (
                  <li key={i}><a className="text-blue-600" href={`tel:${p}`}>{p}</a></li>
                ))}
                {about.contact?.emails?.map((e: string, i: number) => (
                  <li key={i}><a className="text-blue-600" href={`mailto:${e}`}>{e}</a></li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
