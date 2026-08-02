import Link from "next/link"
import { products, formatPrice } from "@/lib/data"

export default async function ShopPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>
}) {
  const { category } = await searchParams
  const filtered = category
    ? products.filter((p) => p.category === category && p.isActive)
    : products.filter((p) => p.isActive)

  return (
    <div className="min-h-screen bg-neutral-50">
      <header className="border-b border-neutral-200 bg-white sticky top-0 z-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <Link href="/" className="text-xl font-bold tracking-tight">MR. FICTION</Link>
            <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-neutral-600">
              <Link href="/shop" className="hover:text-black">All</Link>
              <Link href="/shop?category=Tees" className="hover:text-black">Tees</Link>
              <Link href="/shop?category=Hoodies" className="hover:text-black">Hoodies</Link>
              <Link href="/shop?category=Limited" className="hover:text-black">Limited</Link>
            </nav>
            <Link href="/cart" className="text-sm font-medium">Cart</Link>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight">{category || "All Products"}</h1>
          <p className="mt-2 text-neutral-500">{filtered.length} products</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((product) => (
            <Link key={product.id} href={`/shop/${product.slug}`} className="group">
              <div className="aspect-[4/5] overflow-hidden rounded-xl bg-neutral-100">
                <img src={product.images[0]} alt={product.name} className="h-full w-full object-cover transition group-hover:scale-105" />
              </div>
              <div className="mt-4">
                <h3 className="font-medium text-neutral-900">{product.name}</h3>
                <div className="mt-1 flex items-center gap-2">
                  <span className="font-semibold">{formatPrice(product.price)}</span>
                  {product.compareAt && (
                    <span className="text-sm text-neutral-400 line-through">{formatPrice(product.compareAt)}</span>
                  )}
                </div>
                <p className="mt-1 text-xs text-neutral-500">
                  {product.stock > 0 ? `${product.stock} in stock` : "Out of stock"}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  )
}
