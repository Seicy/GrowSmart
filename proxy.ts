import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "@/lib/auth";

export async function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const token = req.cookies.get("growsmart_token")?.value;

  const isProtected = pathname.startsWith("/dashboard");
  const isAuthPage = pathname.startsWith("/auth/login");

  if (isProtected) {
    if (!token) {
      return NextResponse.redirect(new URL("/auth/login", req.url));
    }
    const user = await verifyToken(token);
    if (!user) {
      const res = NextResponse.redirect(new URL("/auth/login", req.url));
      res.cookies.delete("growsmart_token");
      return res;
    }
  }

  if (isAuthPage && token) {
    const user = await verifyToken(token);
    if (user) return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/auth/login"],
};