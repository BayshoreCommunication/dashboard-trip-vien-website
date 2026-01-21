import { NextResponse } from "next/server";

export default async function middleware(req) {
  const { pathname } = req.nextUrl;

  // Check for next-auth session token cookie
  const sessionToken =
    req.cookies.get("next-auth.session-token")?.value ||
    req.cookies.get("__Secure-next-auth.session-token")?.value;

  if (pathname !== "/sign-in") {
    if (!sessionToken) {
      return NextResponse.redirect(new URL("/sign-in", req.url));
    }
  } else {
    if (sessionToken) {
      return NextResponse.redirect(new URL("/", req.url));
    }
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

// export { default } from "next-auth/middleware";

// export const config = {
//   matcher: ["/", "/blog", "/categories", "/media", "/message", "/settings"],
// };
