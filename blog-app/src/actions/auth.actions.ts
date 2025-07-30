"use server";

import { LoginFormData } from "@/app/(auth)/login/page";
import { SignUpFormData } from "@/app/(auth)/signup/page";
import User from "@/models/user.model";
import connectDb from "@/utils/connectDb";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export const loginAction = async (formdata: LoginFormData): Promise<any> => {
  try {
    await connectDb();
    const data = formdata;
    console.log(data);

    const email = data.email as string;
    const password = data.password as string;

    const user = await User.findOne({ email });

    if (!user) {
      return {
        success: false,
        error: "users not found",
      };
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return {
        success: false,
        error: "invalid credientials",
      };
    }

    const token = jwt.sign({ _id: user._id }, process.env.JWT!);

    const cookieStore = await cookies();
    cookieStore.set("token", token, {
      httpOnly: true,
    });

    return {
      success: true,
      message: "login successful",
    };
  } catch (error) {
    console.log(`something went wrong on login action: ${error}`);
  }
};

export const signupAction = async (formdata: SignUpFormData): Promise<any> => {
  try {
    await connectDb();
    const data = formdata;
    const email = data.email as string;
    const name = data.name as string;
    const password = data.password as string;

    const user = await User.findOne({ email });

    if (user) {
      return {
        error: "users already exists",
      };
    }
    const hashedPw = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      password: hashedPw,
    });

    await newUser.save();

    const token = jwt.sign({ _id: newUser._id }, process.env.JWT!);
    const cookieStore = await cookies();
    cookieStore.set("token", token, {
      httpOnly: true,
    });
    return {
      success: true,
      message: "registration successful",
    };
  } catch (error) {
    console.log(`something went wrong on login action: ${error}`);
  }
};
