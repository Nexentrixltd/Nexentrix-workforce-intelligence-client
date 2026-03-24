import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const sessionToken = req.cookies.get("sessionToken")?.value;

  if (!sessionToken && req.nextUrl.pathname.startsWith("/dashboard")) {
    console.log('no')
    // return NextResponse.redirect(new URL("/auth", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
