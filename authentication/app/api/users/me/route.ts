import { checkToken } from "@/helpers/helper";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const cookieStore = await cookies(); // Await the cookies() method
    const token = cookieStore.get("atoken")?.value;
    console.log("helper", token);

    const decodedToken = await checkToken(token);

    return NextResponse.json({
      message: "success",
      success: true,
      user: decodedToken,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      message: "error",
      success: false,
    });
  }
}
