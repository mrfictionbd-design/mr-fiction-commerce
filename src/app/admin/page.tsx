import Link from "next/link"
import { products, orders, formatPrice } from "../../lib/data"

export default function AdminDashboard() {
  const totalRevenue = orders
    .filter((o) => o.paymentStatus === "PAID")
    .reduce((sum, o) => sum + o.total, 0)

  const totalOrders = orders.length
  const lowStock = products.filter((p) => p.stock < 15).length
  const pendingOrders = orders.filter((o) => o.status === "PENDING" || o.status === "PROCESSING").length

  return (
    <div className="min-h-screen bg-slate-50 flex">
      <aside className="w-64 bg-slate-900 text-slate-300 flex-shrink-0 flex flex-col">
        <div className="h-16 flex items-center px-6 border-b border-slate-700/50">
          <span className="text-white font-semibold text-lg">Mr. Fiction Admin</span>
        </div>
        <nav className="flex-1 py-4">
          <Link href="/admin" className="flex items-center gap-3 px-6 py-2.5 text-sm font-medium bg-blue-500/15 text-blue-400 border-r-2 border-blue-500">Dashboard</Link>
          <Link href="/admin/orders" className="flex items-center gap-3 px-6 py-2.5 text-sm font-medium hover:bg-white/5">Orders</Link>
          <div className="mt-6 px-6">
            <Link href="/" className="text-xs text-slate-500 hover:text-slate-300">&larr; Back to Store</Link>
          </div>
        </nav>
      </aside>

      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6">
          <h1 className="text-lg font-semibold text-slate-900">Dashboard</h1>
          <form action="/api/auth/logout" method="POST">
            <button type="submit" className="text-sm text-slate-500 hover:text-slate-800">Logout</button>
          </form>
        </header>

        <main className="flex-1 overflow-y-auto p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 mb-8">
            <div className="bg-white rounded-xl p-5 border border-slate-100 shadow-sm">
              <p className="text-sm font-medium text-slate-500">Total Revenue</p>
              <p className="text-2xl font-bold text-slate-900 mt-1">{formatPrice(totalRevenue)}</p>
            </div>
            <div className="bg-white rounded-xl p-5 border border-slate-100 shadow-sm">
              <p className="text-sm font-medium text-slate-500">Total Orders</p>
              <p className="text-2xl font-bold text-slate-900 mt-1">{totalOrders}</p>
            </div>
            <div className="bg-white rounded-xl p-5 border border-slate-100 shadow-sm">
              <p className="text-sm font-medium text-slate-500">Pending Orders</p>
              <p className="text-2xl font-bold text-slate-900 mt-1">{pendingOrders}</p>
            </div>
            <div className="bg-white rounded-xl p-5 border border-slate-100 shadow-sm">
              <p className="text-sm font-medium text-slate-500">Low Stock Items</p>
              <p className="text-2xl font-bold text-slate-900 mt-1">{lowStock}</p>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden">
            <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
              <h2 className="text-base font-semibold text-slate-900">Recent Orders</h2>
              <Link href="/admin/orders" className="text-sm text-blue-600 font-medium hover:underline">View all</Link>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-slate-50 text-left text-slate-500">
                    <th className="px-5 py-3 font-medium">Order</th>
                    <th className="px-5 py-3 font-medium">Customer</th>
                    <th className="px-5 py-3 font-medium">Total</th>
                    <th className="px-5 py-3 font-medium">Status</th>
                    <th className="px-5 py-3 font-medium">Payment</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {orders.map((order) => (
                    <tr key={order.id} className="hover:bg-slate-50/50">
                      <td className="px-5 py-3.5 font-medium text-slate-900">{order.orderNumber}</td>
                      <td className="px-5 py-3.5 text-slate-600">{order.email}</td>
                      <td className="px-5 py-3.5 font-medium">{formatPrice(order.total)}</td>
                      <td className="px-5 py-3.5">
                        <span className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          order.status === "DELIVERED" ? "bg-emerald-50 text-emerald-700" :
                          order.status === "PROCESSING" ? "bg-blue-50 text-blue-700" :
                          order.status === "PENDING" ? "bg-amber-50 text-amber-700" :
                          "bg-slate-50 text-slate-700"
                        }`}>{order.status}</span>
                      </td>
                      <td className="px-5 py-3.5">
                        <span className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          order.paymentStatus === "PAID" ? "bg-emerald-50 text-emerald-700" : "bg-amber-50 text-amber-700"
                        }`}>{order.paymentStatus}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="mt-6 bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden">
            <div className="px-5 py-4 border-b border-slate-100">
              <h2 className="text-base font-semibold text-slate-900">Inventory Snapshot</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-slate-50 text-left text-slate-500">
                    <th className="px-5 py-3 font-medium">Product</th>
                    <th className="px-5 py-3 font-medium">SKU</th>
                    <th className="px-5 py-3 font-medium">Category</th>
                    <th className="px-5 py-3 font-medium">Price</th>
                    <th className="px-5 py-3 font-medium">Stock</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {products.map((p) => (
                    <tr key={p.id} className="hover:bg-slate-50/50">
                      <td className="px-5 py-3.5 font-medium text-slate-900">{p.name}</td>
                      <td className="px-5 py-3.5 text-slate-500">{p.sku}</td>
                      <td className="px-5 py-3.5">{p.category}</td>
                      <td className="px-5 py-3.5">{formatPrice(p.price)}</td>
                      <td className="px-5 py-3.5">
                        <span className={p.stock < 15 ? "text-rose-600 font-medium" : ""}>{p.stock}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
