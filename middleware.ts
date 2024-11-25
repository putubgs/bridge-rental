import { type NextRequest, NextResponse } from "next/server";
import { updateSession } from "@/utils/supabase/middleware";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isAuthenticated =
    request.cookies.get("isAuthenticated")?.value === "true";

  if (
    !isAuthenticated &&
    pathname.startsWith("/admin-dashboard") &&
    pathname !== "/admin-dashboard/login"
  ) {
    return NextResponse.redirect(
      new URL("/admin-dashboard/login", request.url),
    );
  }

  if (isAuthenticated && pathname === "/admin-dashboard/login") {
    return NextResponse.redirect(
      new URL("/admin-dashboard/car-details", request.url),
    );
  }

  if (isAuthenticated && pathname === "/admin-dashboard") {
    return NextResponse.redirect(
      new URL("/admin-dashboard/car-details", request.url),
    );
  }

  return NextResponse.next();
}
export const config = {
  matcher: [
    "/admin-dashboard/:path*",
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
