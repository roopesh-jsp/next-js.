import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Title is required"],
    trim: true,
  },
  description: {
    type: String,
    required: [true, "description is required"],
    trim: true,
  },
  image: {
    type: String,
    required: [true, "image is required"],
  },
});

const Post = mongoose.models.post || mongoose.model("post", postSchema);
export default Post;
