import { connectDB } from "@/lib/db";
import ProductsModel from "@/models/Products";
import Mongoose from "mongoose";
import { NextResponse } from "next/server";

await connectDB();

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    if (!Mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        {
          msg: "not an id",
        },
        { status: 500 }
      );
    }
    const prod = await ProductsModel.findById(id);

    if (!prod) {
      return NextResponse.json(
        {
          msg: "product not found with that id",
        },
        { status: 404 }
      );
    }
    return NextResponse.json(
      {
        msg: "product found",
        product: prod,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      {
        msg: "error",
      },
      { status: 500 }
    );
  }
}
export async function PUT(
  req: Request,
  {
    params,
  }: {
    params: Promise<{ id: string }>;
  }
) {
  try {
    const { id } = await params;
    const { title, description, price } = await req.json();
    if (!title || !description || !price) {
      return NextResponse.json(
        {
          msg: "all fields are req",
        },
        {
          status: 500,
        }
      );
    }

    if (!Mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        {
          msg: "not an id",
        },
        {
          status: 500,
        }
      );
    }
    // const isProduct = await ProductsModel.findById(id);

    const updatedProd = await ProductsModel.findByIdAndUpdate(
      id,
      {
        title,
        description,
        price,
      },
      {
        new: true,
      }
    );

    if (!updatedProd) {
      return NextResponse.json(
        {
          msg: "no product found with that id",
        },
        {
          status: 500,
        }
      );
    }
    return NextResponse.json(
      {
        msg: "product updated",
        product: updatedProd,
      },
      {
        status: 200,
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
export async function PATCH(
  req: Request,
  {
    params,
  }: {
    params: Promise<{ id: string }>;
  }
) {
  try {
    const { id } = await params;
    const { title, description, price } = await req.json();

    if (!Mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        {
          msg: "not an id",
        },
        {
          status: 500,
        }
      );
    }
    const isProduct = await ProductsModel.findById(id);
    if (!isProduct) {
      return NextResponse.json(
        {
          msg: "no product found with that id",
        },
        {
          status: 500,
        }
      );
    }

    const newData: any = {};
    if (title) {
      newData.title = title;
    }
    if (description) {
      newData.description = description;
    }
    if (price) newData.price = price;

    const updatedProd = await ProductsModel.findByIdAndUpdate(
      id,
      {
        $set: newData,
      },
      {
        new: true,
      }
    );

    return NextResponse.json(
      {
        msg: "product updated",
        product: updatedProd,
      },
      {
        status: 200,
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
export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    if (!Mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        {
          msg: "not an id",
        },
        { status: 500 }
      );
    }
    // const isProd = await ProductsModel.findById(id);
    // if (!isProd) {
    //   return NextResponse.json(
    //     {
    //       msg: "not prod found",
    //     },
    //     { status: 404 }
    //   );
    // }

    const delProd = await ProductsModel.findByIdAndDelete(id);
    if (!delProd) {
      return NextResponse.json(
        {
          msg: "not prod found",
        },
        { status: 404 }
      );
    }
    return NextResponse.json(
      {
        msg: "prodcut deleted",
        product: delProd,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        msg: "product deletion failed",
      },
      { status: 500 }
    );
  }
}
