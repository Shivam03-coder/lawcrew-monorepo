import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export type UserRole = "admin" | "member" | "client" | "guest";

const routeAccess: Record<string, UserRole[]> = {
  "/admin": ["admin"],
  "/member": ["admin", "member"],
  "/client": ["admin", "client"],
};

// Function to extract session details from cookies
function getSessionData(request: NextRequest) {
  const sessionToken = request.cookies.get("sessionToken")?.value || null;
  const userRole = request.cookies.get("UserRole")?.value?.toLowerCase() as
    | UserRole
    | undefined;
  const userId = request.cookies.get("UserId")?.value || null;

  return { sessionToken, userRole: userRole || "guest", userId };
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const { sessionToken, userRole, userId } = getSessionData(request);

  if (!sessionToken || !userRole || !userId) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  const matchedRoute = Object.keys(routeAccess).find((route) =>
    pathname.startsWith(route),
  );

  if (!matchedRoute) {
    return NextResponse.next();
  }

  if (
    !routeAccess[matchedRoute] ||
    !routeAccess[matchedRoute].includes(userRole)
  ) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/member/:path*", "/client/:path*"],
};
