import { loadSite } from "@/lib/content";

export default function ContactPage() {
  const site = loadSite();
  const contactPage = site?.pages.find(p => p.type === 'contact')
    || site?.pages.find(p => /iletişim|contact/i.test(p.title || ''))
    || site?.pages[0];
  const c = contactPage?.contact || {} as any;

  if (!site) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-20">
        <h1 className="text-3xl font-semibold">Contact</h1>
        <p className="text-gray-600 mt-3">Content not found. Try running npm run scrape first.</p>
      </div>
    );
  }

  return (
    <section className="bg-gradient-to-b from-white to-slate-50">
      <div className="max-w-6xl mx-auto px-4 py-20">
        <header className="mb-10">
          <h1 className="text-4xl font-bold tracking-tight">{contactPage?.title || 'Contact'}</h1>
          {contactPage?.description && <p className="text-gray-600 mt-2 max-w-3xl">{contactPage.description}</p>}
        </header>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="rounded-xl border bg-white p-6 shadow-sm">
            <h3 className="font-semibold mb-2">Telefon</h3>
            <ul className="space-y-1 text-slate-700">
              {c.phones?.map((p: string, i: number) => (
                <li key={i}><a className="text-blue-600" href={`tel:${p}`}>{p}</a></li>
              ))}
            </ul>
          </div>
          <div className="rounded-xl border bg-white p-6 shadow-sm">
            <h3 className="font-semibold mb-2">E‑posta</h3>
            <ul className="space-y-1 text-slate-700">
              {c.emails?.map((e: string, i: number) => (
                <li key={i}><a className="text-blue-600" href={`mailto:${e}`}>{e}</a></li>
              ))}
            </ul>
          </div>
          <div className="rounded-xl border bg-white p-6 shadow-sm">
            <h3 className="font-semibold mb-2">Adres</h3>
            <ul className="space-y-1 text-slate-700">
              {c.addresses?.map((a: string, i: number) => (
                <li key={i}>{a}</li>
              ))}
            </ul>
          </div>
        </div>
        {c.map && (
          <div className="mt-10 rounded-xl overflow-hidden border shadow-sm">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <iframe src={c.map} className="w-full h-[380px]" loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
          </div>
        )}
      </div>
    </section>
  );
}
