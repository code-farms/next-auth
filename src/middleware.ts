import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  // Get the pathname from the request
  const path = request.nextUrl.pathname;

  // Check if the pathname is a match with public urls
  const isPublicPath =
    path === "/login" || path === "/signup" || path === "verifyemail";

  // Get the token from request cookies
  const token = request.cookies.get("token")?.value || "";

  // If url is private and request has token the send the user to the Home page
  // If url is public then send the user to login page
  if (isPublicPath && token) {
    return NextResponse.redirect(new URL("/", request.url));
  }
  if (!isPublicPath && !token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/", "/login", "/signup", "/profile", "/verifyemail"],
};
