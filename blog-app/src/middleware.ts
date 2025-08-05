import { getURL } from "next/dist/shared/lib/utils";
import { NextRequest, NextResponse } from "next/server";
import { getUser } from "./actions/auth.actions";

export const middleware = async (req: NextRequest, res: NextResponse) => {
  const cookies = req.cookies;
  const token = cookies.get("token")?.value as string;

  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
};

export const config = {
  matcher: ["/dashboard"],
};
