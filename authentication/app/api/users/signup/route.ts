import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import User from "@/models/user";
import DbConnect from "@/config/Db";
import { UserT } from "@/types/user.types";

await DbConnect();
export async function POST(req: NextRequest) {
  try {
    const { name, email, password } = await req.json();
    if (!name || !email || !password) {
      return NextResponse.json(
        {
          message: "all fields are required",
          success: false,
        },
        { status: 400 }
      );
    }
    const user: UserT | null = await User.findOne({ email });
    if (user) {
      return NextResponse.json(
        {
          message: "user already exists",
          success: false,
        },
        { status: 400 }
      );
    }
    const hashedPw = await bcryptjs.hash(password, 10);
    const newUser = new User({ name, password: hashedPw, email });
    await newUser.save();
    return NextResponse.json(
      {
        messaage: "success",
        success: true,
        newUser,
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
