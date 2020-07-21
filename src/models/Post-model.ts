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
    tags: [String],
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
    ],
    comments: [
      {
        content: {
          type: String,
          max: 255
        },
        author: String,
        publishedDate: {
          type: Date,
          default: Date.now
        },
        replies: [
          {
            content: {
              type: String,
              max: 255
            },
            author: String,
            publishedDate: {
              type: Date,
              default: Date.now
            }
          }
        ]
      }
    ]
  },
  { timestamps: true }
);

export default model<Document & Post>("Post", PostSchema);
