import { loadSite } from "@/lib/content";

export default function ContactPage() {
  const site = loadSite();
  const contactPage = site?.pages.find(p => p.type === 'contact')
    || site?.pages.find(p => /iletifim|contact/i.test(p.title || ''))
    || site?.pages[0];
  const c = contactPage?.contact || {};

  if (!site) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-16">
        <h1 className="text-2xl font-semibold">Contact</h1>
        <p className="text-gray-600 mt-2">Content not found. Try running npm run scrape first.</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-16 space-y-8">
      <h1 className="text-3xl font-semibold">{contactPage?.title || 'Contact'}</h1>
      <div className="grid md:grid-cols-3 gap-6">
        <div>
          <h4 className="font-medium mb-2">Telefon</h4>
          <ul className="space-y-1 text-gray-700">
            {c.phones?.map((p: string, i: number) => (
              <li key={i}><a className="text-blue-600" href={`tel:${p}`}>{p}</a></li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="font-medium mb-2">E‑posta</h4>
          <ul className="space-y-1 text-gray-700">
            {c.emails?.map((e: string, i: number) => (
              <li key={i}><a className="text-blue-600" href={`mailto:${e}`}>{e}</a></li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="font-medium mb-2">Adres</h4>
          <ul className="space-y-1 text-gray-700">
            {c.addresses?.map((a: string, i: number) => (
              <li key={i}>{a}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
