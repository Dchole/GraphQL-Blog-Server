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
  // @ts-ignore
  user: async (_parent, { id }, { request }) => {
    const userId = id ? id : getUserId(request);
    return await User.findById(userId).select("-password").populate("posts");
  },
  users: async (_parent, _args, _ctx) =>
    await User.find().select("-password").populate("posts"),
  // @ts-ignore
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
  },
  tags: async (_parent, _args, _ctx) => {
    const posts = await Post.find();
    // @ts-ignore
    const allTags = posts?.map(post => post.tags).flat();

    interface ICount {
      [key: string]: number;
    }

    const count: ICount = allTags.reduce((acc, curr) => {
      if (!acc[curr]) acc[curr] = 1;
      else acc[curr] += 1;
      return acc;
    }, {});

    const sorted = Object.entries(count)
      .sort((a, b) => b[1] - a[1])
      // @ts-ignore
      .flat();

    return [...sorted].filter(tag => typeof tag === "string");
  }
};

export default Query;
