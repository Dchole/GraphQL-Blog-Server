import PostModel from "../models/Post-model";

export const createDraft = async (
  data: Pick<
    {
      title: string;
      content: string;
      author: string;
      image?: string | Buffer | ArrayBuffer | null;
    },
    "title" | "content" | "author" | "image"
  >
) => (await PostModel.create(data)).populate("author");
