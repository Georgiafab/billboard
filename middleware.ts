// pages/_middleware.ts

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // No authentication is required if the request path is /login or /api/auth
  if (
    pathname.startsWith("/login") ||
    pathname.startsWith("/api/auth") ||
    pathname.match(/\.(.*)$/) // Matches static resources such as.js,.css,.png,.jpg,.jpeg,.svg,.gif, etc
  ) {
    return NextResponse.next();
  }

  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  // If there is no token, redirect to the /login page
  if (!token) {
    const loginUrl = new URL("/login", req.url);
    loginUrl.searchParams.set("callbackUrl", req.url);
    return NextResponse.redirect(loginUrl);
  }

  // If there is a token, the request is allowed to continue processing
  return NextResponse.next();
}
