import mongoose, { Document, Schema } from "mongoose";
import { boolean } from "zod";

export interface Message extends Document {
  content: string;
  cretedAt: Date;
}

const MessageSchema: Schema<Message> = new Schema({
  content: {
    type: String,
    required: true,
  },
  cretedAt: {
    type: Date,
    default: Date.now,
  },
});

export interface User extends Document {
  email: string;
  password: string;
  messages: Message[];
  verifyCode: string;
  verifyCodeExpiry: Date;
  isAcceptingMessage: boolean;
  username: string;
  isVerified: boolean;
}

const UserSchema: Schema<User> = new Schema({
  username: {
    type: String,
    required: [true, "username is required"],
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: [true, "passwrord is required"],

    trim: true,
  },
  email: {
    type: String,
    required: [true, "emial is required"],
    unique: true,
  },
  verifyCode: {
    type: String,
    required: true,
  },
  verifyCodeExpiry: {
    type: Date,
    default: Date.now() + 3600000,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  isAcceptingMessage: {
    type: Boolean,
    default: true,
  },
  messages: [MessageSchema],
});

const UserModel =
  (mongoose.models.User as mongoose.Model<User>) ||
  mongoose.model<User>("User", UserSchema);

export default UserModel;
