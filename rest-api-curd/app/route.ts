import { connectDB } from "@/lib/db";
import ProductsModel from "@/models/Products";
import { NextRequest, NextResponse } from "next/server";

await connectDB();
export async function GET(req: NextRequest) {
  try {
    const searchParam = await req.nextUrl.searchParams;
    const searchTerm = searchParam.get("q");
    const limit = Number(searchParam.get("limit"));

    const filter: Record<string, any> = {};
    if (searchTerm) {
      filter.title = { $regex: searchTerm, $options: "i" };
    }
    let productsQuery = ProductsModel.find(filter);

    if (!isNaN(limit) && limit > 0) {
      productsQuery = productsQuery.limit(limit);
    }

    const products = await productsQuery;
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
