import { ProductSchemaType } from "@/types/Product.types";
import mongoose, { Model, Schema } from "mongoose";

const ProductSchema = new Schema<ProductSchemaType>(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const ProductsModel: Model<ProductSchemaType> =
  mongoose.models.Product ||
  mongoose.model<ProductSchemaType>("Product", ProductSchema);

export default ProductsModel;
