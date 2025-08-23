import { NextRequest, NextResponse } from "next/server";

export default async function middleware(req: NextRequest) {
  const protectedRoutes = ["/search", "/compare", "/fix", "/paraphrase"];
  const currentPath = req.nextUrl.pathname;

  const isProtectedRoute = protectedRoutes.some((route) =>
    currentPath.includes(route)
  );

  if (isProtectedRoute) {
    const sessionToken =
      req.cookies.get("next-auth.session-token") ||
      req.cookies.get("__Secure-next-auth.session-token");

    if (!sessionToken) {
      return Response.redirect(new URL("/auth", req.url));
    }
  }

  return NextResponse.next();
}
