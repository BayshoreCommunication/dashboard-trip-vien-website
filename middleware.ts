import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const sessionToken =
    request.cookies.get("next-auth.session-token")?.value ||
    request.cookies.get("__Secure-next-auth.session-token")?.value;

  const { pathname } = request.nextUrl;

  // Allow sign-in page
  if (pathname === "/sign-in") {
    if (sessionToken) {
      return NextResponse.redirect(new URL("/", request.url));
    }
    return NextResponse.next();
  }

  // Protect all other matched routes
  if (!sessionToken) {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/",
    "/blog/:path*",
    "/categories",
    "/media",
    "/message",
    "/settings",
    "/sign-in",
  ],
};
