import { NextResponse } from "next/server"
import { orders } from "@/lib/data"
import { getAdminSession } from "@/lib/auth"

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getAdminSession()
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const { id } = await params
  const body = await req.json()
  const { status } = body

  const validStatuses = ["PENDING", "PROCESSING", "SHIPPED", "DELIVERED", "CANCELLED", "REFUNDED"]
  if (!validStatuses.includes(status)) {
    return NextResponse.json({ error: "Invalid status" }, { status: 400 })
  }

  const order = orders.find((o) => o.id === id)
  if (!order) {
    return NextResponse.json({ error: "Order not found" }, { status: 404 })
  }

  order.status = status
  return NextResponse.json({ success: true, order })
}
