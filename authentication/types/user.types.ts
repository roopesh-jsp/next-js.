import { Document } from "mongoose";

export interface UserT extends Document {
  name?: string;
  email: string;
  password: string;
}

export type userResT = {
  message: string;
  success: boolean;
  newUser?: UserT;
  user?: UserT;
};
