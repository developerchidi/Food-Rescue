import { auth } from "@/auth"
import {
  DEFAULT_LOGIN_REDIRECT,
  apiAuthPrefix,
  authRoutes,
  publicRoutes,
  ratelimitRoutes,
  adminRoutesPrefix,
  merchantRoutesPrefix,
} from "@/lib/routes"
import { ratelimit } from "@/lib/ratelimit"
import { NextResponse } from "next/server"

export default auth(async (req) => {
  const { nextUrl } = req
  const isLoggedIn = !!req.auth
  const ip = req.headers.get("x-forwarded-for") ?? "127.0.0.1"
  const user = req.auth?.user as any
  const userRole = user?.role

  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix)
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname)
  const isAuthRoute = authRoutes.includes(nextUrl.pathname)
  const isRatelimitRoute = ratelimitRoutes.includes(nextUrl.pathname)
  const isAdminRoute = nextUrl.pathname.startsWith(adminRoutesPrefix)
  const isMerchantRoute = nextUrl.pathname.startsWith(merchantRoutesPrefix)

  let response = NextResponse.next()

  // 1. Ap dung Rate Limiting
  const isSensitive = isRatelimitRoute || isApiAuthRoute
  const limitResult = await ratelimit(ip, nextUrl.pathname, userRole, isSensitive)

  if (!limitResult.success && limitResult.response) {
    return limitResult.response
  }

  if (limitResult.headers) {
    Object.entries(limitResult.headers).forEach(([key, value]) => {
      response.headers.set(key, value)
    })
  }

  // 2. Xu ly logic chuyen huong
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

  // Chặn truy cập Admin trái phép
  if (isAdminRoute && userRole !== "ADMIN") {
    return NextResponse.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl))
  }

  // Chặn truy cập Merchant (Donor) trái phép
  if (isMerchantRoute && userRole !== "DONOR") {
    return NextResponse.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl))
  }

  return response
})

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
}
