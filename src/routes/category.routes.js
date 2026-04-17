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

console.log("Swagger test file loaded");

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Categories
 *   description: Category management APIs
 */

router.use(authenticate);

router
  .route("/")
  /**
   * @swagger
   * /categories:
   *   post:
   *     summary: Create a new category
   *     tags: [Categories]
   *     security:
   *       - bearerAuth: []
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/CreateCategoryInput'
   *     responses:
   *       201:
   *         description: Category created successfully
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/CategoryResponse'
   *       400:
   *         description: Validation error
   *       401:
   *         description: Unauthorized
   */

  .post(validation(createCategorySchema), createCategory)
  /**
   * @swagger
   * /categories:
   *   get:
   *     summary: Get all categories (default + user categories)
   *     tags: [Categories]
   *     security:
   *       - bearerAuth: []
   *     responses:
   *       200:
   *         description: List of categories
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/CategoriesListResponse'
   *       401:
   *         description: Unauthorized
   */
  .get(getAllCategories);

router
  .route("/:id")
  /**
   * @swagger
   * /categories/{id}:
   *   get:
   *     summary: Get category by ID
   *     tags: [Categories]
   *     security:
   *       - bearerAuth: []
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: string
   *         example: "65f1c2a3"
   *     responses:
   *       200:
   *         description: Category found
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/CategoryResponse'
   *       403:
   *         description: Not authorized
   *       404:
   *         description: Category not found
   */
  .get(validation(getOrDeleteCategorySchema), getCategoryById)
  /**
   * @swagger
   * /categories/{id}:
   *   put:
   *     summary: Update category (only user-owned categories)
   *     tags: [Categories]
   *     security:
   *       - bearerAuth: []
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: string
   *     requestBody:
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/CreateCategoryInput'
   *     responses:
   *       200:
   *         description: Category updated
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/CategoryResponse'
   *       403:
   *         description: Not authorized
   *       404:
   *         description: Category not found
   */
  .put(validation(updateCategorySchema), updateCategory)
  /**
   * @swagger
   * /categories/{id}:
   *   delete:
   *     summary: Delete category (only user-owned categories)
   *     tags: [Categories]
   *     security:
   *       - bearerAuth: []
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: string
   *     responses:
   *       200:
   *         description: Category deleted
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 success:
   *                   type: boolean
   *                 message:
   *                   type: string
   *                   example: "Category deleted successfully"
   *       403:
   *         description: Not authorized
   *       404:
   *         description: Category not found
   */
  .delete(validation(getOrDeleteCategorySchema), deleteCategory);

export default router;
