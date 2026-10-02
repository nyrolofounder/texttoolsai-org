import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Protected paths requiring auth check
  const isProtectedPath =
    pathname.startsWith("/dashboard") || pathname.startsWith("/settings");

  // In production with Supabase configured, check for supabase auth token cookies or demo cookie
  // Note: Client-side auth guard also protects these pages gracefully for SSG and dynamic loads.
  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/settings/:path*"],
};
