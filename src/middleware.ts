import { auth } from "@/auth"
import {
  DEFAULT_LOGIN_REDIRECT,
  apiAuthPrefix,
  authRoutes,
  publicRoutes,
  ratelimitRoutes,
} from "@/lib/routes"
import { ratelimit } from "@/lib/ratelimit"
import { NextResponse } from "next/server"

export default auth(async (req) => {
  const { nextUrl } = req
  const isLoggedIn = !!req.auth
  const ip = req.headers.get("x-forwarded-for") ?? "127.0.0.1"
  const userRole = (req.auth?.user as any)?.role

  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix)
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname)
  const isAuthRoute = authRoutes.includes(nextUrl.pathname)
  const isRatelimitRoute = ratelimitRoutes.includes(nextUrl.pathname)

  let response = NextResponse.next()

  // 1. Ap dung Rate Limiting chuyen nghiep (Multi-layer & Priority-aware)
  // Sensitive routes la cac route trong danh sach ratelimitRoutes hoac api auth
  const isSensitive = isRatelimitRoute || isApiAuthRoute

  const limitResult = await ratelimit(ip, nextUrl.pathname, userRole, isSensitive)

  if (!limitResult.success && limitResult.response) {
    return limitResult.response
  }

  // Gan header vao response neu thanh cong (Observable)
  if (limitResult.headers) {
    Object.entries(limitResult.headers).forEach(([key, value]) => {
      response.headers.set(key, value)
    })
  }

  // 2. Xu ly logic chuyen huong (Authentication)
  if (isApiAuthRoute) {
    return response
  }

  if (isAuthRoute) {
    if (isLoggedIn) {
      return NextResponse.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl))
    }
    return response
  }

  if (!isLoggedIn && !isPublicRoute) {
    return NextResponse.redirect(new URL("/login", nextUrl))
  }

  return response
})

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)", "/api/auth/register", "/api/contact"],
}
