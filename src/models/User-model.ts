import { Schema, model, Document } from "mongoose";
import { User } from "../../types";

const UserSchema = new Schema(
  {
    fullName: {
      type: String,
      required: true
    },
    email: {
      type: String,
      unique: true,
      required: true
    },
    password: {
      type: String,
      min: 8,
      required: true
    },
    bio: {
      type: String,
      min: 3,
      max: 225
    },
    posts: [
      {
        type: Schema.Types.ObjectId,
        ref: "Post"
      }
    ],
    role: {
      type: Schema.Types.String,
      default: "USER"
    },
    profilePicture: Buffer
  },
  { timestamps: true }
);

export default model<Document & User & { password: string }>(
  "User",
  UserSchema
);
