"use client"

import { useState } from "react"
import Link from "next/link"
import { orders as initialOrders, formatPrice, type Order } from "@/lib/data"

const STATUSES = ["PENDING", "PROCESSING", "SHIPPED", "DELIVERED", "CANCELLED", "REFUNDED"] as const

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>(initialOrders)
  const [updating, setUpdating] = useState<string | null>(null)

  async function updateStatus(id: string, status: string) {
    setUpdating(id)
    try {
      const res = await fetch(`/api/orders/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      })
      if (res.ok) {
        setOrders((prev) =>
          prev.map((o) => (o.id === id ? { ...o, status: status as Order["status"] } : o))
        )
      }
    } finally {
      setUpdating(null)
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 flex">
      <aside className="w-64 bg-slate-900 text-slate-300 flex-shrink-0 flex flex-col">
        <div className="h-16 flex items-center px-6 border-b border-slate-700/50">
          <span className="text-white font-semibold text-lg">Mr. Fiction Admin</span>
        </div>
        <nav className="flex-1 py-4">
          <Link href="/admin" className="flex items-center gap-3 px-6 py-2.5 text-sm font-medium hover:bg-white/5">Dashboard</Link>
          <Link href="/admin/orders" className="flex items-center gap-3 px-6 py-2.5 text-sm font-medium bg-blue-500/15 text-blue-400 border-r-2 border-blue-500">Orders</Link>
          <div className="mt-6 px-6">
            <Link href="/" className="text-xs text-slate-500 hover:text-slate-300">&larr; Back to Store</Link>
          </div>
        </nav>
      </aside>

      <div className="flex-1 flex flex-col">
        <header className="h-16 bg-white border-b border-slate-200 flex items-center px-6">
          <h1 className="text-lg font-semibold text-slate-900">Orders</h1>
        </header>

        <main className="flex-1 overflow-y-auto p-6">
          <div className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-slate-50 text-left text-slate-500">
                  <th className="px-5 py-3 font-medium">Order</th>
                  <th className="px-5 py-3 font-medium">Customer</th>
                  <th className="px-5 py-3 font-medium">Items</th>
                  <th className="px-5 py-3 font-medium">Total</th>
                  <th className="px-5 py-3 font-medium">Payment</th>
                  <th className="px-5 py-3 font-medium">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {orders.map((order) => (
                  <tr key={order.id} className="hover:bg-slate-50/50">
                    <td className="px-5 py-3.5 font-medium text-slate-900">{order.orderNumber}</td>
                    <td className="px-5 py-3.5 text-slate-600">{order.email}</td>
                    <td className="px-5 py-3.5 text-slate-600">
                      {order.items.map((i) => `${i.name} x${i.quantity}`).join(", ")}
                    </td>
                    <td className="px-5 py-3.5 font-medium">{formatPrice(order.total)}</td>
                    <td className="px-5 py-3.5">
                      <span className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        order.paymentStatus === "PAID" ? "bg-emerald-50 text-emerald-700" : "bg-amber-50 text-amber-700"
                      }`}>{order.paymentStatus}</span>
                    </td>
                    <td className="px-5 py-3.5">
                      <select
                        value={order.status}
                        disabled={updating === order.id}
                        onChange={(e) => updateStatus(order.id, e.target.value)}
                        className="text-xs font-medium border border-slate-200 rounded-lg px-2 py-1.5 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/30"
                      >
                        {STATUSES.map((s) => (
                          <option key={s} value={s}>{s}</option>
                        ))}
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </div>
  )
}
