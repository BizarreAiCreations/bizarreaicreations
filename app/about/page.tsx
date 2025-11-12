import { groundTruth } from "@/content/ground_truth";

export default function AboutPage() {
  const about = groundTruth.about;
  return (
    <section className="bg-white">
      <div className="max-w-6xl mx-auto px-4 py-20">
        <header className="mb-12">
          <span className="inline-flex items-center rounded-full bg-red-50 text-red-700 px-3 py-1 text-xs font-medium">Hakkımızda</span>
          <h1 className="mt-4 text-4xl font-bold tracking-tight text-slate-900">Kurumsal</h1>
          <p className="mt-2 text-slate-600">Güven, profesyonellik ve kurumsal disiplin ile.</p>
        </header>
        <div className="grid md:grid-cols-12 gap-10">
          <div className="md:col-span-8 space-y-10">
            <section>
              <h2 className="text-2xl font-semibold text-slate-900 border-l-4 border-red-600 pl-3">Hakkımızda</h2>
              <div className="mt-4 space-y-4 text-slate-800">
                {about.hakkimizda.map((p, i) => (
                  <p key={i} className="leading-8">{p}</p>
                ))}
              </div>
            </section>
            <section>
              <h2 className="text-2xl font-semibold text-slate-900 border-l-4 border-red-600 pl-3">Tarihçe</h2>
              <div className="mt-4 space-y-4 text-slate-800">
                {about.tarihce.map((p, i) => (
                  <p key={i} className="leading-8">{p}</p>
                ))}
              </div>
            </section>
            <section>
              <h2 className="text-2xl font-semibold text-slate-900 border-l-4 border-red-600 pl-3">Misyon ve Vizyon</h2>
              <div className="mt-4 space-y-4 text-slate-800">
                {about.misyonVizyon.map((p, i) => (
                  <p key={i} className="leading-8">{p}</p>
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>
    </section>
  );
}
