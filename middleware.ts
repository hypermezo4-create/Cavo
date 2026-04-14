import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { ADMIN_SESSION_COOKIE } from "@/lib/auth-constants";

export function middleware(req: NextRequest) {
  const { pathname, search } = req.nextUrl;

  if (pathname.startsWith("/admin")) {
    const sessionCookie = req.cookies.get(ADMIN_SESSION_COOKIE)?.value;

    if (!sessionCookie) {
      const loginUrl = new URL("/auth/login", req.url);
      loginUrl.searchParams.set("admin", "1");
      loginUrl.searchParams.set("callbackUrl", pathname + search);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
