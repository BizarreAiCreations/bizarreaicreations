import Section from "@/components/Section";
import Image from "next/image";
import { Site } from "@/lib/content";

export default function ContentRenderer({ site }: { site: Site }) {
  const home = site.pages?.[0];
  const contact = home?.contact || {};

  return (
    <div>
      {/* Hero */}
      <section className="relative isolate overflow-hidden bg-white">
        <div className="mx-auto max-w-6xl px-4 py-16 lg:py-20">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h1 className="text-3xl md:text-4xl font-semibold">{home?.title || "Klinik"}</h1>
              {home?.description && (
                <p className="mt-4 text-gray-600">{home.description}</p>
              )}
            </div>
            <div className="grid grid-cols-3 gap-3">
              {home?.images?.slice(0,6).map((img, idx) => (
                <div key={idx} className="relative aspect-square rounded-lg overflow-hidden bg-gray-50">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={img.src} alt={img.alt || ""} className="h-full w-full object-cover" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Sections */}
      {home?.sections?.map((s, i) => (
        <Section key={i} id={s.title.toLowerCase().replace(/\s+/g, "-")} title={s.title}>
          <div className="space-y-3 text-gray-700">
            {s.items?.map((it, j) => (
              <div key={j} className={it.type === 'bullet' ? 'list-disc ml-6' : ''}>
                {it.type === 'subheading' ? (
                  <h3 className="text-lg font-medium">{it.text}</h3>
                ) : (
                  <p>{it.text}</p>
                )}
              </div>
            ))}
          </div>
        </Section>
      ))}

      {/* Contact */}
      <Section id="contact" title="İletişim">
        <div className="grid md:grid-cols-3 gap-6">
          <div>
            <h4 className="font-medium mb-2">Telefon</h4>
            <ul className="space-y-1 text-gray-700">
              {contact.phones?.map((p: string, i: number) => (
                <li key={i}><a className="text-blue-600" href={`tel:${p}`}>{p}</a></li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-medium mb-2">E‑posta</h4>
            <ul className="space-y-1 text-gray-700">
              {contact.emails?.map((e: string, i: number) => (
                <li key={i}><a className="text-blue-600" href={`mailto:${e}`}>{e}</a></li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-medium mb-2">Adres</h4>
            <ul className="space-y-1 text-gray-700">
              {contact.addresses?.map((a: string, i: number) => (
                <li key={i}>{a}</li>
              ))}
            </ul>
          </div>
        </div>
      </Section>
    </div>
  );
}
