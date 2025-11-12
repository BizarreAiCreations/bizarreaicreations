"use client";
import { groundTruth } from "@/content/ground_truth";
import { useState } from "react";

export default function QuotePage() {
  const services = groundTruth.services.urunlerimiz.map(s => s.title);
  const [selected, setSelected] = useState<string[]>([]);

  const toggle = (value: string) => {
    setSelected(prev => prev.includes(value) ? prev.filter(v => v !== value) : [...prev, value]);
  };

  return (
    <section className="bg-white">
      <div className="max-w-6xl mx-auto px-4 py-20">
        <header className="mb-8">
          <span className="inline-flex items-center rounded-full bg-red-50 text-red-700 px-3 py-1 text-xs font-medium">Teklif</span>
          <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-900">Hızlı Teklif Formu</h1>
          <p className="mt-2 text-slate-600">İletişim bilgilerinizi ve almak istediğiniz hizmetleri paylaşın, en kısa sürede size dönüş yapalım.</p>
        </header>

        <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-slate-700">İsim</label>
            <input className="mt-2 w-full rounded-lg border border-slate-200 p-3 focus:outline-none focus:ring-2 focus:ring-red-600" />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700">Mail Adresi</label>
            <input type="email" className="mt-2 w-full rounded-lg border border-slate-200 p-3 focus:outline-none focus:ring-2 focus:ring-red-600" />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700">Telefon numarası</label>
            <input type="tel" className="mt-2 w-full rounded-lg border border-slate-200 p-3 focus:outline-none focus:ring-2 focus:ring-red-600" />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-slate-700">Satın Almak İstediğiniz Hizmet</label>
            <div className="mt-2 grid sm:grid-cols-2 lg:grid-cols-3 gap-2">
              {services.map((title) => (
                <button key={title} type="button" onClick={() => toggle(title)}
                  className={`text-left rounded-lg border px-4 py-2 transition ${selected.includes(title) ? 'border-red-600 bg-red-50 text-red-800' : 'border-slate-200 hover:border-red-300'}`}>
                  {title}
                </button>
              ))}
            </div>
          </div>
          <div className="md:col-span-2">
            <button type="submit" className="inline-flex items-center rounded-lg bg-red-700 px-5 py-3 text-white font-medium hover:bg-red-800 transition">Teklif Al</button>
          </div>
        </form>
      </div>
    </section>
  );
}
