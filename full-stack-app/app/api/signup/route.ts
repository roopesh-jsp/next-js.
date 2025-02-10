import { sendVerificationEmail } from "@/helpers/sendverificationcode";
import dbConnect from "@/lib/dbconnect";
import UserModel from "@/models/User";
// import { ApiResponse } from "@/types/ApiResponse";
import bcrypt from "bcryptjs";

export async function POST(request: Request) {
  await dbConnect();
  try {
    const { username, email, password } = await request.json();

    const existingUserVerifiedByUsername = await UserModel.findOne({
      username,
      isVerified: true,
    });

    //user asking for taken username to give him
    if (existingUserVerifiedByUsername) {
      return Response.json({
        success: false,
        message: "username is already taken",
      });
    }

    const existingUserByEmail = await UserModel.findOne({ email });

    const verifyCode = Math.floor(10000 + Math.random() * 900000).toString();

    if (existingUserByEmail) {
      if (existingUserByEmail.isVerified) {
        return Response.json({
          success: false,
          message: "user already exists with this mail",
        });
      } else {
        const hashedPw = await bcrypt.hash(password, 10);
        existingUserByEmail.password = hashedPw;
        existingUserByEmail.verifyCode = verifyCode;
        existingUserByEmail.verifyCodeExpiry = new Date(Date.now() + 3600000);
        await existingUserByEmail.save();
      }
    } else {
      const hashedPw = await bcrypt.hash(password, 10);
      const expiryDate = new Date();
      expiryDate.setHours(expiryDate.getHours() + 1);

      const newUser = new UserModel({
        username,
        email,
        password: hashedPw,
        verifyCode,
        verifyCodeExpiry: expiryDate,
        isVerified: false,
        isAcceptingMessage: true,
        messages: [],
      });
      await newUser.save();
    }
    //sending verification email
    const emailResponse = await sendVerificationEmail(
      email,
      username,
      password
    );

    if (!emailResponse.success) {
      return Response.json({
        success: false,
        message: emailResponse.message,
      });
    }
    return Response.json({
      success: true,
      message: emailResponse.message,
    });
  } catch (error) {
    console.error("Error registring user", error);
    return Response.json({
      success: false,
      message: "error cant add user",
    });
  }
}
