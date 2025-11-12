export default function Nav() {
  return (
    <header className="w-full sticky top-0 z-40 bg-white/70 backdrop-blur border-b border-gray-100">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <a href="/" className="text-xl font-semibold">Clinic</a>
        <nav className="hidden md:flex items-center gap-6 text-sm text-gray-700">
          <a href="/services" className="hover:text-black">Services</a>
          <a href="/about" className="hover:text-black">About</a>
          <a href="/contact" className="hover:text-black">Contact</a>
        </nav>
      </div>
    </header>
  );
}
