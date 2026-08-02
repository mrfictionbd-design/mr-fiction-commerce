import Link from "next/link"
import { products, formatPrice } from "../../lib/data"
import { notFound } from "next/navigation"
import AddToCartButton from "../../components/AddToCartButton"

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const product = products.find((p) => p.slug === slug)
  if (!product) notFound()

  return (
    <div className="min-h-screen bg-neutral-50">
      <header className="border-b border-neutral-200 bg-white sticky top-0 z-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <Link href="/" className="text-xl font-bold tracking-tight">MR. FICTION</Link>
            <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-neutral-600">
              <Link href="/shop" className="hover:text-black">Shop</Link>
              <Link href="/shop?category=Tees" className="hover:text-black">Tees</Link>
              <Link href="/shop?category=Hoodies" className="hover:text-black">Hoodies</Link>
              <Link href="/shop?category=Limited" className="hover:text-black">Limited</Link>
            </nav>
            <Link href="/cart" className="text-sm font-medium">Cart</Link>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="aspect-[4/5] overflow-hidden rounded-2xl bg-neutral-100">
            <img src={product.images[0]} alt={product.name} className="h-full w-full object-cover" />
          </div>
          <div className="flex flex-col">
            <p className="text-sm font-medium text-neutral-500 uppercase tracking-wider">{product.category}</p>
            <h1 className="mt-2 text-3xl font-bold tracking-tight text-neutral-900">{product.name}</h1>
            <div className="mt-4 flex items-center gap-3">
              <span className="text-2xl font-semibold">{formatPrice(product.price)}</span>
              {product.compareAt && (
                <span className="text-lg text-neutral-400 line-through">{formatPrice(product.compareAt)}</span>
              )}
            </div>
            <p className="mt-6 text-neutral-600 leading-relaxed">{product.description}</p>
            <div className="mt-6 flex items-center gap-2 text-sm">
              <span className={`inline-block w-2 h-2 rounded-full ${product.stock > 0 ? "bg-emerald-500" : "bg-rose-500"}`} />
              {product.stock > 0 ? `${product.stock} in stock` : "Out of stock"}
            </div>
            <div className="mt-8">
              <AddToCartButton
                product={{
                  id: product.id,
                  name: product.name,
                  slug: product.slug,
                  price: product.price,
                  image: product.images[0],
                }}
                disabled={product.stock <= 0}
              />
            </div>
            <div className="mt-10 border-t border-neutral-200 pt-6 space-y-3 text-sm text-neutral-500">
              <p>&bull; 220+ GSM heavyweight cotton</p>
              <p>&bull; Drop-shoulder oversized fit</p>
              <p>&bull; Free shipping on orders over $100</p>
              <p>&bull; SKU: {product.sku}</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
