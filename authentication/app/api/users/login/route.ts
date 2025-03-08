import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import User from "@/models/user";
import DbConnect from "@/config/Db";
import { UserT } from "@/types/user.types";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

await DbConnect();
export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();
    if (!email || !password) {
      return NextResponse.json(
        {
          message: "all fields are required",
          success: false,
        },
        { status: 400 }
      );
    }
    const user: UserT | null = await User.findOne({ email });
    if (!user) {
      return NextResponse.json(
        {
          message: "user not exist",
          success: false,
        },
        { status: 400 }
      );
    }
    const compare = await bcryptjs.compare(password, user.password);
    if (!compare) {
      return NextResponse.json(
        {
          message: "wrong credientials",
          success: false,
        },
        { status: 400 }
      );
    }
    const token = jwt.sign({ id: user._id }, "seceret");
    const cookieStore = await cookies();

    // Set the token in the cookie
    cookieStore.set("atoken", token, {
      httpOnly: true,
    });

    return NextResponse.json(
      {
        messaage: "success",
        success: true,
        user,
      },
      {
        status: 200,
      }
    );
  } catch (error: any) {
    console.log(error);
    return NextResponse.json({
      message: "something went worng",
      //   error: error.errorResponse.errmsg,
    });
  }
}
