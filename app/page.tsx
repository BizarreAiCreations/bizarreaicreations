import { groundTruth } from "@/content/ground_truth";

export default function Home() {
  const home = groundTruth.home;
  const services = groundTruth.services.urunlerimiz;

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-b from-red-700 to-red-800 text-white">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;utf8,<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"100%\" height=\"100%\"><defs><pattern id=\"p\" width=\"40\" height=\"40\" patternUnits=\"userSpaceOnUse\" patternTransform=\"rotate(45)\"><rect width=\"40\" height=\"40\" fill=\"none\"/><circle cx=\"0\" cy=\"0\" r=\"1\" fill=\"%23ffffff22\"/></pattern></defs><rect width=\"100%\" height=\"100%\" fill=\"url(%23p)\"/></svg>')] opacity-40"></div>
        <div className="relative max-w-6xl mx-auto px-4 py-24 text-center">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">{home.hero.title}</h1>
          <div className="mt-6 space-y-1 text-lg md:text-xl font-medium">
            <p>1995'den beri...</p>
            <p>iyi günde kötü günde</p>
            <p>A kalite sigortacılık hep yanınızda.</p>
          </div>
          <div className="mt-10 flex items-center justify-center gap-3">
            <a href="/teklif-al" className="inline-flex items-center rounded-lg bg-white px-5 py-3 text-red-800 font-semibold hover:bg-red-50 transition">Teklif Al</a>
            <a href="/services" className="inline-flex items-center rounded-lg bg-red-900/40 px-5 py-3 text-white font-medium hover:bg-red-900/60 transition">Ürünlerimiz</a>
            <a href="/contact" className="inline-flex items-center rounded-lg border border-white/30 px-5 py-3 text-white font-medium hover:bg-white/10 transition">İletişim</a>
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

      {/* Ürünlerimiz (adlar) */}
      <section className="bg-white">
        <div className="max-w-6xl mx-auto px-4 py-14">
          <h2 className="text-2xl font-semibold text-slate-900">Ürünlerimiz</h2>
          <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {services.map((s, i) => (
              <div key={i} className="rounded-lg border border-slate-200 bg-white px-4 py-3 text-slate-900 hover:border-red-300 hover:shadow-sm transition">
                {s.title}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
