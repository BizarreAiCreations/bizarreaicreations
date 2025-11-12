import { groundTruth } from "@/content/ground_truth";

export default function ContactPage() {
  const info = groundTruth.contact.info;
  const form = groundTruth.contact.form;
  return (
    <section className="bg-white">
      <div className="max-w-6xl mx-auto px-4 py-20">
        <header className="mb-12">
          <span className="inline-flex items-center rounded-full bg-red-50 text-red-700 px-3 py-1 text-xs font-medium">İletişim</span>
          <h1 className="mt-4 text-4xl font-bold tracking-tight text-slate-900">Bize Ulaşın</h1>
          <p className="mt-2 text-slate-600">Sorularınız için güler yüzlü ve profesyonel destek.</p>
        </header>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="font-semibold mb-2 text-slate-900">Telefon</h3>
            <ul className="space-y-1 text-slate-700">
              {info.phone?.map((p, i) => (
                <li key={i}><a className="text-red-700" href={`tel:${p}`}>{p}</a></li>
              ))}
            </ul>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="font-semibold mb-2 text-slate-900">E‑posta</h3>
            <ul className="space-y-1 text-slate-700">
              {info.email?.map((e, i) => (
                <li key={i}><a className="text-red-700" href={`mailto:${e}`}>{e}</a></li>
              ))}
            </ul>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="font-semibold mb-2 text-slate-900">Adres</h3>
            <ul className="space-y-1 text-slate-700">
              {info.address?.map((a, i) => (
                <li key={i}>{a}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12">
          <h2 className="text-2xl font-semibold text-slate-900">Bize Yazın</h2>
          <form className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            {form.fields.map((f) => (
              f.type === 'textarea' ? (
                <div key={f.name} className="md:col-span-2">
                  <label className="block text-sm font-medium text-slate-700">{f.label}</label>
                  <textarea className="mt-2 w-full rounded-lg border border-slate-200 p-3 focus:outline-none focus:ring-2 focus:ring-red-600" rows={5}></textarea>
                </div>
              ) : (
                <div key={f.name}>
                  <label className="block text-sm font-medium text-slate-700">{f.label}</label>
                  <input type={f.type} className="mt-2 w-full rounded-lg border border-slate-200 p-3 focus:outline-none focus:ring-2 focus:ring-red-600" />
                </div>
              )
            ))}
            <div className="md:col-span-2">
              <button type="submit" className="inline-flex items-center rounded-lg bg-red-700 px-5 py-3 text-white font-medium hover:bg-red-800 transition">Gönder</button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
