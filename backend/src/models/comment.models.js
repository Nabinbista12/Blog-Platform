import { Schema, model } from "mongoose";

const commentSchema = Schema(
  {
    content: {
      type: String,
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

const Comment = model("Comment", commentSchema);
export default Comment;
