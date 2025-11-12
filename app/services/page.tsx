import { loadSite } from "@/lib/content";

export default function ServicesPage() {
  const site = loadSite();
  const servicesPage = site?.pages.find(p => p.type === 'services')
    || site?.pages.find(p => /hizmet|services?/i.test(p.title || ''))
    || site?.pages[0];
  const services = servicesPage?.services || [];

  if (!site) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-20">
        <h1 className="text-3xl font-semibold">Services</h1>
        <p className="text-gray-600 mt-3">Content not found. Try running npm run scrape first.</p>
      </div>
    );
  }

  return (
    <section className="bg-gradient-to-b from-white to-slate-50">
      <div className="max-w-6xl mx-auto px-4 py-20">
        <header className="mb-10">
          <h1 className="text-4xl font-bold tracking-tight">{servicesPage?.title || 'Services'}</h1>
          {servicesPage?.description && <p className="text-gray-600 mt-2 max-w-3xl">{servicesPage.description}</p>}
        </header>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s: any, i: number) => (
            <a key={i} href={s.link || '#'} className="block rounded-2xl border shadow-sm hover:shadow-md transition bg-white">
              <div className="p-5">
                <h3 className="text-lg font-semibold">{s.title}</h3>
                {s.description && <p className="text-slate-600 text-sm mt-2 line-clamp-3">{s.description}</p>}
              </div>
              <div className="px-5 pb-5">
                <span className="inline-flex items-center text-blue-600 text-sm">Detaylar →</span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
