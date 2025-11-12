import { groundTruth } from "@/content/ground_truth";

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 py-10 text-sm text-slate-600 bg-white">
      <div className="max-w-6xl mx-auto px-4 flex flex-col gap-6">
        <p className="text-center text-slate-700 leading-relaxed">{groundTruth.footer.altBanner}</p>
        <div className="flex items-center justify-between text-xs text-slate-500">
          <span>© {new Date().getFullYear()} Tüm hakları saklıdır.</span>
          <span>Next.js + Tailwind</span>
        </div>
      </div>
    </footer>
  );
}
