import Category from "../models/category.model.js";
import { createError } from "../utils/error.js";

export const createCategory = async (req, res, next) => {
  const { type, icon, color } = req.body;
  const newCategory = new Category({
    type,
    user: req.user.id,
    icon,
    color,
  });
  await newCategory.save();
  res.status(201).json({ success: true, data: newCategory });
};

export const getAllCategories = async (req, res, next) => {
  const categories = await Category.find({
    $or: [{ user: null }, { user: req.user.id }]
  });
  res.status(200).json({ success: true, count: categories.length, data: categories });
};

export const getCategoryById = async (req, res, next) => {
  const { id } = req.params;
  const category = await Category.findById(id);

  if (!category) return next(createError(404, "Category not found"));

  if (category.user && category.user.toString() !== req.user.id) {
    return next(createError(403, "Not authorized to access this category"));
  }

  return res.status(200).json({ success: true, data: category });
};

export const updateCategory = async (req, res, next) => {
  const { id } = req.params;
  const category = await Category.findById(id);

  if (!category) return next(createError(404, "Category not found"));

  if (!category.user || category.user.toString() !== req.user.id) {
    return next(createError(403, "Not authorized to update this category"));
  }

  const updatedCategory = await Category.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true
  });

  res.status(200).json({ success: true, data: updatedCategory });
};

export const deleteCategory = async (req, res, next) => {
  const { id } = req.params;
  const category = await Category.findById(id);

  if (!category) return next(createError(404, "Category not found"));

  if (!category.user || category.user.toString() !== req.user.id) {
    return next(createError(403, "Not authorized to delete this category"));
  }

  await Category.findByIdAndDelete(id);

  return res.status(200).json({ success: true, message: "Category deleted successfully" });
};
