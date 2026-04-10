import express from "express";
import {
  createCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
} from "../controllers/category.controller.js";
import { authenticate } from "../middlewares/auth.middleware.js";
import { validation } from "../middlewares/validation.middleware.js";
import {
  createCategorySchema,
  getOrDeleteCategorySchema,
  updateCategorySchema,
} from "../validation/category.validation.js";

const router = express.Router();

router.use(authenticate);

router
  .route("/")
  .post(validation(createCategorySchema), createCategory)
  .get(getAllCategories);

router
  .route("/:id")
  .get(validation(getOrDeleteCategorySchema), getCategoryById)
  .put(validation(updateCategorySchema), updateCategory)
  .delete(validation(getOrDeleteCategorySchema), deleteCategory);

export default router;
