"use client"

import { useState } from "react"
import { addToCart } from "../lib/cart"

type Props = {
  product: {
    id: string
    name: string
    slug: string
    price: number
    image: string
  }
  disabled?: boolean
}

export default function AddToCartButton({ product, disabled }: Props) {
  const [added, setAdded] = useState(false)

  function handleAdd() {
    addToCart(product)
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  return (
    <button
      onClick={handleAdd}
      disabled={disabled}
      className={`w-full sm:w-auto px-10 py-3.5 rounded-full text-sm font-semibold transition ${
        disabled
          ? "bg-neutral-200 text-neutral-400 cursor-not-allowed"
          : added
          ? "bg-emerald-600 text-white"
          : "bg-neutral-900 text-white hover:bg-neutral-800"
      }`}
    >
      {disabled ? "Out of Stock" : added ? "Added to Cart \u2713" : "Add to Cart"}
    </button>
  )
}
