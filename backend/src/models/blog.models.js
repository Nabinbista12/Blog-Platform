import { Schema, model } from "mongoose";

const blogSchema = Schema(
  {
    title: {
      type: String,
      maxLength: 100,
      required: true,
    },
    content: {
      type: String,
      maxLength: 1000,
      required: true,
    },
    userId: {
      type: Schema.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

const Blog = model("Blog", blogSchema);
export default Blog;
