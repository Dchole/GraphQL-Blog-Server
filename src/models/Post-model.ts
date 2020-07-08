import { Schema, model, Document } from "mongoose";
import { Post } from "../../types";

const PostSchema = new Schema(
  {
    title: {
      type: String,
      min: 3,
      max: 225,
      required: true
    },
    content: {
      type: String,
      max: 1024,
      required: true
    },
    image: Buffer,
    published: {
      type: Boolean,
      default: false
    },
    publishedDate: Date,
    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    votes: [
      {
        type: Schema.Types.ObjectId,
        ref: "User"
      }
    ]
  },
  { timestamps: true }
);

export default model<Document & Post>("Post", PostSchema);
