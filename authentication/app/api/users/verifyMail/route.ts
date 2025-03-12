import DbConnect from "@/config/Db";
import User from "@/models/user";
import { NextRequest, NextResponse } from "next/server";

DbConnect();
export async function POST(req: NextRequest) {
  try {
    const { token } = await req.json();
    console.log(token);

    const user: any = await User.find({ verifyToken: token });
    console.log(user);

    if (!user) {
      return NextResponse.json(
        {
          message: "error no user",
          success: false,
        },
        {
          status: 400,
        }
      );
    }
    user[0].isVerifed = true;
    user[0].verifyToken = "";
    await user[0].save();
    return NextResponse.json(
      {
        message: "user verified",
        success: true,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.log(error);
  }
}
