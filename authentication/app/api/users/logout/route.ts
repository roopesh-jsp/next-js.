import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const cookieStore = await cookies();
  cookieStore.set("atoken", "", {
    httpOnly: true,
  });
  return NextResponse.json({
    message: "loggeed out",
  });
}
