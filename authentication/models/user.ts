import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "please provide name"],
  },
  email: {
    type: String,
    required: [true, "please provide emial"],
    unique: [true, "email already exists"],
  },
  password: {
    type: String,
    required: true,
  },
  verifyToken: { type: String },
  isVerifed: {
    type: Boolean,
    default: false,
  },
});

const User = mongoose.models.User || mongoose.model("User", UserSchema);

export default User;
