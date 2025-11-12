import { loadSite } from "@/lib/content";

export default function ServicesPage() {
  const site = loadSite();
  const servicesPage = site?.pages.find(p => p.type === 'services')
    || site?.pages.find(p => /hizmet|services?/i.test(p.title || ''));
  const services = servicesPage?.services || [];

  if (!site) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-16">
        <h1 className="text-2xl font-semibold">Services</h1>
        <p className="text-gray-600 mt-2">Content not found. Try running npm run scrape first.</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-16">
      <h1 className="text-3xl font-semibold mb-6">{servicesPage?.title || 'Services'}</h1>
      <div className="grid md:grid-cols-2 gap-6">
        {services.map((s: any, i: number) => (
          <a key={i} href={s.link || '#'} className="block rounded-lg border p-4 hover:shadow">
            <h3 className="font-medium">{s.title}</h3>
            {s.description && <p className="text-gray-600 text-sm mt-1">{s.description}</p>}
          </a>
        ))}
      </div>
    </div>
  );
}
