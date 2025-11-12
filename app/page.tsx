import { groundTruth } from "@/content/ground_truth";

export default function Home() {
  const home = groundTruth.home;
  const services = groundTruth.services.urunlerimiz;

  return (
    <div>
      {/* Hero */}
      <section className="relative bg-gradient-to-b from-white to-slate-50">
        <div className="max-w-6xl mx-auto px-4 py-20">
          <div className="max-w-2xl">
            <span className="inline-flex items-center rounded-full bg-red-50 text-red-700 px-3 py-1 text-xs font-medium">Kurumsal Sigortacılık</span>
            <h1 className="mt-4 text-4xl md:text-5xl font-bold tracking-tight text-slate-900">{home.hero.title}</h1>
            {home.hero.subtitle && (
              <p className="mt-4 text-lg text-slate-700">{home.hero.subtitle}</p>
            )}
            <div className="mt-8 flex items-center gap-3">
              <a href="/services" className="inline-flex items-center rounded-lg bg-red-700 px-5 py-3 text-white font-medium hover:bg-red-800 transition">Ürünlerimiz</a>
              <a href="/contact" className="inline-flex items-center rounded-lg border border-slate-300 px-5 py-3 text-slate-800 font-medium hover:bg-slate-50 transition">İletişim</a>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Services */}
      <section className="bg-white">
        <div className="max-w-6xl mx-auto px-4 py-14">
          <h2 className="text-2xl font-semibold text-slate-900">Öne Çıkan Ürünler</h2>
          <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {home.featured.map((f, i) => (
              <div key={i} className="group rounded-2xl border border-slate-200 bg-white shadow-sm hover:shadow-md transition">
                <div className="p-5">
                  <h3 className="text-lg font-semibold text-slate-900 group-hover:text-red-700">{f.title}</h3>
                  {f.description && <p className="text-slate-600 text-sm mt-2 leading-6">{f.description}</p>}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats: Rakamlarla Altınel Sigorta */}
      {home.stats && home.stats.length > 0 && (
        <section className="bg-red-700">
          <div className="max-w-6xl mx-auto px-4 py-14 text-white">
            <h2 className="text-2xl font-semibold">Rakamlarla Altınel Sigorta</h2>
            <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
              {home.stats.map((s, i) => (
                <div key={i} className="rounded-xl bg-white/10 p-6">
                  <div className="text-3xl font-bold">{s.value}</div>
                  <div className="text-sm opacity-90 mt-1">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Services grid (full list preview) */}
      <section className="bg-white">
        <div className="max-w-6xl mx-auto px-4 py-14">
          <h2 className="text-2xl font-semibold text-slate-900">Tüm Ürünler</h2>
          <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((s, i) => (
              <div key={i} className="rounded-2xl border border-slate-200 bg-white shadow-sm">
                <div className="p-5">
                  <h3 className="text-lg font-semibold text-slate-900">{s.title}</h3>
                  {s.description && <p className="text-slate-600 text-sm mt-2 leading-6">{s.description}</p>}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
