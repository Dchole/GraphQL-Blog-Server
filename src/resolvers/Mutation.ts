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
  createDraft: async (_parent, args, { request }) => {
    const author: string = getUserId(request);
    const created = await createDraft({ ...args, author });

    const user = await User.findById(author);

    user?.posts.push(created._id);
    user?.save();

    return created;
  },
  updateDraft: async (_parent, { id, ...rest }, { request }) => {
    const post = await Post.findById(id).populate("author");
    const userId = getUserId(request);

    if (
      post?.published ||
      (userId !== String(post?.author._id) && post?.author.role === "USER")
    )
      throw new Error("You can't edit this post");
    // @ts-ignore
    return await Post.findByIdAndUpdate(id, rest, { new: true });
  },
  deletePost: async (_parent, { id }, { request }) => {
    const post = await Post.findByIdAndDelete(id).populate("author");
    const userId = getUserId(request);

    if (String(post?.author._id) !== userId && post?.author.role === "USER")
      throw new Error("You can't delete this post");

    return post!;
  },
  vote: async (_parent, { id }, { request, pubsub }) => {
    const post = await Post.findById(id);
    if (!post) throw new Error("Something went wrong");

    const userId = getUserId(request);
    post.votes.includes(userId)
      ? post.votes.splice(post.votes.indexOf(userId), 1)
      : post.votes.push(userId);

    post.votes = [...new Set(post.votes)];

    post.save();

    const newVote = { userId, postId: post._id };

    pubsub.publish("NEW_VOTE", { newVote });
    return newVote;
  },
  publish: async (_parent, { id }, { request, pubsub }) => {
    const post = await Post.findById(id).populate("author");
    const userId = getUserId(request);

    if (String(post?.author._id) !== userId && post?.author.role === "USER")
      throw new Error("You can't publish this post");

    const updatedPost = await Post.findByIdAndUpdate(
      id,
      {
        published: true,
        publishedDate: new Date().toISOString()
      },
      { new: true }
    );

    pubsub.publish("NEW_POST", { newPost: updatedPost });
    return updatedPost!;
  }
};

export default Mutation;
