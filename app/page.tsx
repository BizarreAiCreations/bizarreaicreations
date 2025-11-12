import { loadSite } from "@/lib/content";
import ContentRenderer from "./ContentRenderer";

export default function Home() {
  const site = loadSite();
  if (!site) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-16">
        <h1 className="text-2xl font-semibold">İçerik hazırlanıyor</h1>
        <p className="text-gray-600 mt-2">Lütfen önce <code>npm run scrape</code> komutunu çalıştırın.</p>
      </div>
    );
  }
  return <ContentRenderer site={site} />;
}
