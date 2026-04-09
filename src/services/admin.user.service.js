import { User } from "../models/user.model.js";

export const getAllUsers = async (page, limit) => {
  const skip = (page - 1) * limit;
  const users = await User.find().skip(skip).limit(limit);
  return users;
};

export const getUserById = async (id) => {
  const user = await User.findById(id);
  if (!user) return null;
  return user;
};

export const deleteUserById = async (id) => {
  const user = await User.findByIdAndDelete(id);
  if (!user) return null;
  return user;
};

export const blockUser = async (id) => {
  const user = await User.findByIdAndUpdate(id, { blocked: true }, { new: true });
  if (!user) return null;
  return user;
};

export const unblockUser = async (id) => {
  const user = await User.findByIdAndUpdate(id, { blocked: false }, { new: true });
  if (!user) return null;
  return user;
};

