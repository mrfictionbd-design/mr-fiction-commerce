import { SignJWT, jwtVerify } from "jose"
import { cookies } from "next/headers"

const SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || "mr-fiction-dev-secret-change-in-production-32chars"
)

const ADMIN = {
  email: "admin@mrfiction.com",
  password: "admin123",
  name: "Admin",
}

export async function loginAdmin(email: string, password: string) {
  if (email === ADMIN.email && password === ADMIN.password) {
    const token = await new SignJWT({ email, name: ADMIN.name, role: "admin" })
      .setProtectedHeader({ alg: "HS256" })
      .setExpirationTime("7d")
      .sign(SECRET)
    return { token, user: { email, name: ADMIN.name } }
  }
  return null
}

export async function verifyAdminToken(token: string) {
  try {
    const { payload } = await jwtVerify(token, SECRET)
    return payload as { email: string; name: string; role: string }
  } catch {
    return null
  }
}

export async function getAdminSession() {
  const cookieStore = await cookies()
  const token = cookieStore.get("admin_token")?.value
  if (!token) return null
  return verifyAdminToken(token)
}
