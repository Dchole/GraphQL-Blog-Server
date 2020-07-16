import { Role } from "../../types";
import UserModel from "../models/User-model";
import { CreateQuery } from "mongoose";

export const createUser = async (
  data: CreateQuery<{
    fullName: string;
    email: string;
    password: string;
    image?: string | Buffer | ArrayBuffer | null;
    bio?: string | null;
    role?: Role | null;
  }>
) => {
  const { role, ...rest } = data;

  const newUser = role ? new UserModel(data) : new UserModel(rest);
  await newUser.save();
  return newUser;
};
