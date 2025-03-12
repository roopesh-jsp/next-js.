import { sendMail } from "@/helpers/helper";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    console.log(data);

    await sendMail(data.email, data.data);
    return NextResponse.json({
      message: "email sent",
    });
  } catch (error: any) {
    console.log(error);
    return NextResponse.json({
      message: error.message,
    });
  }
}
