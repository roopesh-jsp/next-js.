import { NextRequest, NextResponse } from "next/server";
import { zformSchema } from "@/app/dashboard/page";
import Post from "@/models/post.models";
import connectDb from "@/utils/connectDb";
import { imagekit } from "@/utils/imagekit";

export async function POST(req: NextRequest) {
  await connectDb();

  const formData = await req.formData();

  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const image = formData.get("image") as File;

  //   const parsedData = zformSchema.safeParse({ title, description, image });
  //   if (!parsedData.success) {
  //     return NextResponse.json(
  //       { success: false, error: "something went worng ons structure" },
  //       { status: 400 }
  //     );
  //   }

  try {
    const buffer = await image.arrayBuffer();
    const base64 = Buffer.from(buffer).toString("base64");

    const uploadResponse = await imagekit.upload({
      file: base64,
      fileName: `${Date.now()}-${image.name}`,
    });

    const newPost = new Post({
      title,
      description,
      image: uploadResponse.url,
    });

    await newPost.save();

    return NextResponse.json(
      { success: true, message: "Post created successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.log("Error while creating post:", error);
    return NextResponse.json(
      { success: false, error: "Something went wrong" },
      { status: 500 }
    );
  }
}
