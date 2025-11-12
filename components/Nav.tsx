import Image from "next/image";

export default function Nav() {
  return (
    <header className="w-full sticky top-0 z-40 bg-white/70 backdrop-blur supports-[backdrop-filter]:bg-white/60 border-b border-gray-100">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <a href="/" className="flex items-center gap-3">
          <Image src="https://www.abdulkadiraltinel.com.tr/Content/images/logo.jpg" alt="Altınel Sigorta" width={160} height={40} className="h-10 w-auto" />
        </a>
        <nav className="hidden md:flex items-center gap-6 text-sm text-slate-700">
          <a href="/services" className="inline-flex items-center px-3 py-2 rounded-md hover:text-red-700 hover:bg-red-50 transition">Ürünlerimiz</a>
          <a href="/about" className="inline-flex items-center px-3 py-2 rounded-md hover:text-red-700 hover:bg-red-50 transition">Hakkımızda</a>
          <a href="/contact" className="inline-flex items-center px-3 py-2 rounded-md hover:text-red-700 hover:bg-red-50 transition">İletişim</a>
        </nav>
      </div>
    </header>
  );
}
