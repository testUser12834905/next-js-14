import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const hasIsLoggedIn = req.cookies.has("isLoggedIn");

  if (hasIsLoggedIn) {
    console.log("shouldb be logged in");
  }

  console.log("should be logged out");

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
