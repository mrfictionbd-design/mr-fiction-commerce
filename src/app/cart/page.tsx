"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import {
  getCart,
  updateQuantity,
  removeFromCart,
  cartTotal,
  cartCount,
  type CartItem,
} from "@/lib/cart"
import { formatPrice } from "@/lib/data"

export default function CartPage() {
  const [items, setItems] = useState<CartItem[]>([])
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setItems(getCart())
    setMounted(true)
    const handler = () => setItems(getCart())
    window.addEventListener("cart-updated", handler)
    return () => window.removeEventListener("cart-updated", handler)
  }, [])

  if (!mounted) {
    return (
      <div className="min-h-screen bg-neutral-50 flex items-center justify-center">
        <p className="text-neutral-500">Loading cart...</p>
      </div>
    )
  }

  const total = cartTotal(items)
  const count = cartCount(items)

  return (
    <div className="min-h-screen bg-neutral-50">
      <header className="border-b border-neutral-200 bg-white sticky top-0 z-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <Link href="/" className="text-xl font-bold tracking-tight">MR. FICTION</Link>
            <Link href="/shop" className="text-sm font-medium hover:underline">Continue Shopping</Link>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
        <h1 className="text-2xl font-bold tracking-tight mb-8">
          Cart {count > 0 && `(${count})`}
        </h1>

        {items.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-neutral-500 mb-6">Your cart is empty.</p>
            <Link href="/shop" className="inline-flex px-8 py-3 rounded-full bg-neutral-900 text-white text-sm font-semibold hover:bg-neutral-800">
              Shop Now
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {items.map((item) => (
              <div key={item.id} className="flex gap-4 bg-white rounded-xl p-4 border border-neutral-100">
                <img src={item.image} alt={item.name} className="w-24 h-28 object-cover rounded-lg bg-neutral-100" />
                <div className="flex-1 flex flex-col">
                  <div className="flex justify-between">
                    <div>
                      <h3 className="font-medium">{item.name}</h3>
                      <p className="text-sm text-neutral-500 mt-0.5">{formatPrice(item.price)}</p>
                    </div>
                    <button onClick={() => setItems(removeFromCart(item.id))} className="text-neutral-400 hover:text-rose-500 text-sm">
                      Remove
                    </button>
                  </div>
                  <div className="mt-auto flex items-center gap-3">
                    <button onClick={() => setItems(updateQuantity(item.id, item.quantity - 1))} className="w-8 h-8 rounded-full border border-neutral-200 flex items-center justify-center hover:bg-neutral-50">&minus;</button>
                    <span className="w-6 text-center text-sm font-medium">{item.quantity}</span>
                    <button onClick={() => setItems(updateQuantity(item.id, item.quantity + 1))} className="w-8 h-8 rounded-full border border-neutral-200 flex items-center justify-center hover:bg-neutral-50">+</button>
                    <span className="ml-auto font-semibold">{formatPrice(item.price * item.quantity)}</span>
                  </div>
                </div>
              </div>
            ))}

            <div className="bg-white rounded-xl p-6 border border-neutral-100">
              <div className="flex justify-between text-lg font-semibold">
                <span>Total</span>
                <span>{formatPrice(total)}</span>
              </div>
              <p className="mt-2 text-sm text-neutral-500">Shipping calculated at checkout.</p>
              <button
                className="mt-6 w-full py-3.5 rounded-full bg-neutral-900 text-white text-sm font-semibold hover:bg-neutral-800"
                onClick={() => alert("Stripe Checkout coming next. Cart is working!")}
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
