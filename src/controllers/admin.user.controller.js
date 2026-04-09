import * as adminUserService from "../services/admin.user.service.js";
import { createError } from "../utils/error.js";

export const getAllUsers = async (req, res, next) => {
  const { page = 1, limit = 10 } = req.query;
  const users = await adminUserService.getAllUsers(page, limit);
  if (users.length === 0) {
    throw createError(404, "No users found");
  }
  res.status(200).json({ success: true, data: users });
};

export const getUserById = async (req, res, next) => {
  const { id } = req.params;
  const user = await adminUserService.getUserById(id);
  if (!user) {
    throw createError(404, "User not found");
  }
  res.status(200).json({ success: true, data: user });
};

export const deleteUserById = async (req, res, next) => {
  const { id } = req.params;
  const user = await adminUserService.deleteUserById(id);
  if (!user) {
    throw createError(404, "User not found");
  }
  res.status(200).json({ success: true, message: "User deleted successfully" });
};

export const blockUser = async (req, res, next) => {
  const { id } = req.params;
  const user = await adminUserService.blockUser(id);
  if (!user) {
    throw createError(404, "User not found");
  }
  res.status(200).json({ success: true, message: "User blocked successfully" });
};

export const unblockUser = async (req, res, next) => {
  const { id } = req.params;
  const user = await adminUserService.unblockUser(id);
  if (!user) {
    throw createError(404, "User not found");
  }
  res.status(200).json({ success: true, message: "User unblocked successfully" });
};
