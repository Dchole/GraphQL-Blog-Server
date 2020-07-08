import { genSalt, hash } from "bcryptjs";
import { MutationResolvers } from "../../types";
import { createUser } from "../controllers/user-controller";
import { createDraft } from "../controllers/post-controller";
import Post from "../models/Post-model";
import User from "../models/User-model";
import { getUserId } from "../util";

const Mutation: MutationResolvers = {
  signUp: async (_parent, { password, role, ...rest }, _ctx) => {
    const salt = await genSalt(10);
    const hashedPassword = await hash(password, salt);

    return await createUser({
      ...rest,
      role,
      password: hashedPassword
    });
  },
  createDraft: async (_parent, args, context) => {
    const author: string = getUserId(context);
    const created = await createDraft({ ...args, author });

    const user = await User.findById(author);
    user.posts.push(created._id);
    user.save();

    return created;
  },
  updateDraft: async (_parent, { id, ...rest }, context) => {
    const post = await Post.findById(id).populate("author");
    const userId = getUserId(context);

    if (
      post.published ||
      (userId !== String(post.author._id) && post.author.role === "USER")
    )
      throw new Error("You can't edit this post");

    return await Post.findByIdAndUpdate(id, rest, { new: true });
  },
  deletePost: async (_parent, { id }, context) => {
    const post = await Post.findByIdAndDelete(id).populate("author");
    const userId = getUserId(context);

    if (String(post.author._id) !== userId && post.author.role === "USER")
      throw new Error("You can't delete this post");

    return post;
  },
  vote: async (_parent, { id }, context) => {
    const post = await Post.findById(id);
    const userId = getUserId(context);
    if (post.votes.includes(userId)) {
      post.votes.splice(post.votes.indexOf(userId), 1);
      post.save();
    } else {
      post.votes.push(userId);
      post.save();
    }

    const vote = post.votes.find(vote => String(vote) === userId);
    return { userId: String(vote) };
  },
  publish: async (_parent, { id }, context) => {
    const post = await Post.findById(id).populate("author");
    const userId = getUserId(context);

    if (String(post.author._id) !== userId && post.author.role === "USER")
      throw new Error("You can't publish this post");

    return await Post.findByIdAndUpdate(
      id,
      {
        published: true,
        publishedDate: new Date().toISOString()
      },
      { new: true }
    );
  }
};

export default Mutation;
