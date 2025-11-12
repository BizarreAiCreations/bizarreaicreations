import { groundTruth } from "@/content/ground_truth";

export default function ServicesPage() {
  const services = groundTruth.services.urunlerimiz;
  return (
    <section className="bg-white">
      <div className="max-w-6xl mx-auto px-4 py-20">
        <header className="mb-12">
          <span className="inline-flex items-center rounded-full bg-red-50 text-red-700 px-3 py-1 text-xs font-medium">Ürünlerimiz</span>
          <h1 className="mt-4 text-4xl font-bold tracking-tight text-slate-900">Hizmet ve Ürünler</h1>
          <p className="mt-2 text-slate-600">Profesyonel çözümler, güvenilir hizmet.</p>
        </header>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s, i) => (
            <div key={i} className="group rounded-2xl border border-slate-200 bg-white shadow-sm hover:shadow-md transition">
              <div className="p-5">
                <h3 className="text-lg font-semibold text-slate-900 group-hover:text-red-700">{s.title}</h3>
                {s.description && <p className="text-slate-600 text-sm mt-2 leading-6">{s.description}</p>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
