import { connectDB } from "@/lib/db";
import ProductsModel from "@/models/Products";
import { NextResponse } from "next/server";

await connectDB();
export async function GET(req: Request) {
  try {
    const products = await ProductsModel.find();
    return NextResponse.json({
      data: products,
    });
  } catch (error) {
    console.error("Error fetching products:", error);

    // Return a structured error response
    return NextResponse.json(
      {
        message: "Failed to fetch products.",
        error:
          process.env.NODE_ENV === "development"
            ? (error as Error).message
            : "Something went wrong.",
      },
      { status: 500 } // Set status to 500 (Internal Server Error)
    );
  }
}

export async function POST(req: Request) {
  try {
    const { title, description, price } = await req.json();
    if (!title || !description || !price) {
      return NextResponse.json(
        {
          msg: "all fields are req",
        },
        {
          status: 400,
        }
      );
    }
    const newProd = new ProductsModel({
      title,
      description,
      price,
    });
    await newProd.save();

    return NextResponse.json(
      {
        msg: "product added",
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    console.error("Error creating products:", error);

    // Return a structured error response
    return NextResponse.json(
      {
        message: "Failed to fetch products.",
        error:
          process.env.NODE_ENV === "development"
            ? (error as Error).message
            : "Something went wrong.",
      },
      { status: 500 } // Set status to 500 (Internal Server Error)
    );
  }
}
