import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { QueryResolvers } from "../../types";
import User from "../models/User-model";
import Post from "../models/Post-model";
import { getUserId } from "../util";

const Query: QueryResolvers = {
  login: async (_parent, { email, password }, _ctx) => {
    const user = await User.findOne({ email }).populate("posts");

    if (!user) throw new Error("❌ User does not exist");
    if (!compare(password, user.password)) throw new Error("❌ Wrong Password");

    const token = sign({ userId: user._id }, process.env.JWT_SECRET);
    return { token };
  },
  user: async (_parent, { id }, _ctx) =>
    await User.findById(id).select("-password").populate("posts"),
  users: async (_parent, _args, _ctx) =>
    await User.find().select("-password").populate("posts"),
  post: async (_parent, { id }, _ctx) =>
    await Post.findById(id).populate("author"),
  posts: async (_parent, _args, _ctx) =>
    await Post.find({ published: true }).populate("author"),
  drafts: async (_parent, _args, context) => {
    const userId = getUserId(context);
    return await Post.find({ author: userId, published: false }).populate(
      "author"
    );
  }
};

export default Query;
