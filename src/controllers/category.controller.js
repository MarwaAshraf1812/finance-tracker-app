import Category from "../models/category.model.js";

export const createCategory = async (req, res) => {
  const { type, user, icon, color } = req.body;
  const newCategory = new Category({
    type,
    user,
    icon,
    color,
  });
  await newCategory.save();
  res.status(201).json({ data: newCategory });
};

export const getAllCategories = async (req, res) => {
  const categories = await Category.find();
  res.status(200).json({ data: categories });
};

export const getCategoryById = async (req, res) => {
  const { id } = req.params;

  if (!id) return res.status(400).json({ message: "category id needed" });

  const category = await Category.findById(id);

  if (!category) return res.status(404).json({ message: "category not found" });

  return res.status(200).json({ data: category });
};

export const updateCategory = async (req, res) => {
  const { id } = req.params;

  if (!id) return res.status(400).json({ message: "category id needed" });

  const category = await Category.findByIdAndUpdate(id, req.body, {
    new: true,
  });

  if (!category) return res.status(404).json({ message: "category not found" });

  res.status(200).json({ data: category });
};

export const deleteCategory = async (req, res) => {
  const { id } = req.params;
  if (!id) return res.status(400).json({ message: "category id needed" });

  const deleted = await Category.findByIdAndDelete(id);

  if (!deleted) return res.status(404).json({ message: "category not found" });

  return res.status(200).json({ message: "category deleted" });
};
