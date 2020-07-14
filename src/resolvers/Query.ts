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
  posts: async (_parent, args, { request }) => {
    const userId = args.currentUser ? getUserId(request) : args.author;

    const posts = await Post.find(
      // @ts-ignore
      userId
        ? {
            published: true,
            author: { _id: userId }
          }
        : { published: true }
    )
      .populate("author")
      .sort(args.sortBy === "popular" ? "-votes" : "-publishedDate")
      .skip(args.skip)
      .limit(args.limit);

    return posts;
  },
  drafts: async (_parent, _args, context) => {
    const userId = getUserId(context);
    return await Post.find({ author: userId, published: false }).populate(
      "author"
    );
  }
};

export default Query;
