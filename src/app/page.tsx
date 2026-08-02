import Link from "next/link";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-neutral-50">
      <header className="border-b border-neutral-200 bg-white sticky top-0 z-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <Link href="/" className="text-xl font-bold tracking-tight">MR. FICTION</Link>
            <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-neutral-600">
              <Link href="/shop" className="hover:text-black transition">Shop</Link>
              <Link href="/shop?category=Tees" className="hover:text-black transition">Tees</Link>
              <Link href="/shop?category=Hoodies" className="hover:text-black transition">Hoodies</Link>
              <Link href="/shop?category=Limited" className="hover:text-black transition">Limited</Link>
            </nav>
            <div className="flex items-center gap-4">
              <Link href="/cart" className="text-sm font-medium hover:underline">Cart</Link>
              <Link href="/admin" className="text-xs text-neutral-400 hover:text-neutral-600">Admin</Link>
            </div>
          </div>
        </div>
      </header>

      <section className="relative bg-neutral-900 text-white">
        <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8 lg:py-32">
          <div className="max-w-2xl">
            <p className="text-sm font-medium tracking-widest text-neutral-400 uppercase mb-4">FW&apos;25 &middot; New Drop</p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-tight">
              YOUR CHOICE: MINIMAL BY DESIGN, STRONG BY NATURE
            </h1>
            <p className="mt-6 text-lg text-neutral-300 max-w-xl">
              Premium drop-shoulder tees and hoodies. Strong basics that carry the whole look daily.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link href="/shop" className="inline-flex items-center justify-center rounded-full bg-white px-8 py-3 text-sm font-semibold text-black hover:bg-neutral-100 transition">
                Shop Latest Drop
              </Link>
              <Link href="/shop?category=Limited" className="inline-flex items-center justify-center rounded-full border border-white/30 px-8 py-3 text-sm font-semibold text-white hover:bg-white/10 transition">
                Limited Drops
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-2xl font-bold tracking-tight">Shop by Category</h2>
          <p className="mt-2 text-neutral-500">Core pieces upgraded with stronger materials and refined tailoring.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { name: "Tees", desc: "Premium oversized drop-shoulder. Clean everyday pieces.", href: "/shop?category=Tees" },
            { name: "Hoodies", desc: "Heavyweight comfort with signature prints.", href: "/shop?category=Hoodies" },
            { name: "Limited Drops", desc: "Exclusive graphics. Once they are gone, they are gone.", href: "/shop?category=Limited" },
          ].map((cat) => (
            <Link key={cat.name} href={cat.href} className="group relative overflow-hidden rounded-2xl bg-neutral-200 aspect-[4/5] flex flex-col justify-end p-6 hover:bg-neutral-300 transition">
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
              <div className="relative z-10 text-white">
                <h3 className="text-xl font-semibold">{cat.name}</h3>
                <p className="mt-1 text-sm text-white/80">{cat.desc}</p>
                <span className="mt-3 inline-block text-sm font-medium underline underline-offset-4">Shop Collection &rarr;</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="bg-neutral-900 text-white py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div><p className="text-3xl font-bold">220+ GSM</p><p className="mt-2 text-neutral-400">Heavyweight cotton that holds its shape</p></div>
            <div><p className="text-3xl font-bold">100% Cotton</p><p className="mt-2 text-neutral-400">Premium materials, no compromises</p></div>
            <div><p className="text-3xl font-bold">Drop-Shoulder</p><p className="mt-2 text-neutral-400">Modern oversized fit built to last</p></div>
          </div>
        </div>
      </section>

      <footer className="border-t border-neutral-200 bg-white py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-neutral-500">&copy; 2026 Mr. Fiction. All rights reserved.</p>
            <div className="flex gap-6 text-sm text-neutral-500">
              <Link href="/shop" className="hover:text-black">Shop</Link>
              <Link href="/admin" className="hover:text-black">Admin</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
