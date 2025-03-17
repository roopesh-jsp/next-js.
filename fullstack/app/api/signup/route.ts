import { DBconnect } from "@/config/ConnectDb";
import { sendVerificationEmail } from "@/helpers/sendVerificationCode";
import UserModel from "@/models/user.model";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

await DBconnect();
export async function POST(req: NextRequest) {
  try {
    const { username, email, password } = await req.json();
    const existingUserThatVerfied = await UserModel.findOne({
      username,
      isVerified: true,
    });
    if (existingUserThatVerfied) {
      return NextResponse.json(
        {
          success: false,
          message: "username taken",
        },
        {
          status: 400,
        }
      );
    }
    const existingUser = await UserModel.findOne({ email });
    const verifyCode = Math.floor(100000 + Math.random() * 900000).toString();
    if (existingUser) {
      if (existingUser.isVerified) {
        return NextResponse.json(
          {
            success: true,
            message: "user already exits",
          },
          {
            status: 400,
          }
        );
      } else {
        const hashedPw = await bcrypt.hash(password, 10);
        existingUser.password = hashedPw;
        existingUser.verifyCode = verifyCode;
        existingUser.verifyCodeExpiry = new Date(Date.now() + 3600000);
        await existingUser.save();
      }
    } else {
      const hashedPw = await bcrypt.hash(password, 10);

      //setting it for 1 day validilty
      const verifyCodeExpiry = new Date();
      verifyCodeExpiry.setHours(verifyCodeExpiry.getHours() + 24);

      const newUser = new UserModel({
        username,
        password: hashedPw,
        verifyCodeExpiry,
        email,
        isVerified: false,
        verifyCode,
        messages: [],
      });
      await newUser.save();
      const emailRes = await sendVerificationEmail(email, username, verifyCode);

      if (!emailRes.success) {
        return NextResponse.json(
          {
            success: true,
            message: emailRes.message,
          },
          {
            status: 400,
          }
        );
      }
      return NextResponse.json(
        {
          success: true,
          message: "user created",
        },
        {
          status: 201,
        }
      );
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        success: false,
        message: "failed to create user",
      },
      {
        status: 500,
      }
    );
  }
}
