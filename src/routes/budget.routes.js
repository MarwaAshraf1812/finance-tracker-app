import express from "express";
import {
  createBudget,
  getBudgets,
  getBudgetById,
  updateBudget,
  deleteBudget,
} from "../controllers/budget.controller.js";
import { authenticate } from "../middlewares/auth.middleware.js";
import { validation } from "../middlewares/validation.middleware.js";
import {
  createBudgetSchema,
  updateBudgetSchema,
  deleteOrGetBudgetSchema,
} from "../validation/budget.validation.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Budgets
 *   description: Budget management APIs
 */
/**
 * @swagger
 * components:
 *   schemas:
 *     BudgetInput:
 *       type: object
 *       required:
 *         - amount
 *         - month
 *         - year
 *       properties:
 *         amount:
 *           type: number
 *           example: 1200
 *         category:
 *           type: string
 *           nullable: true
 *           description: Category ID, null or empty for global budget
 *           example: "65f1c2a3b4e7d91f2a4e8891"
 *         month:
 *           type: integer
 *           minimum: 1
 *           maximum: 12
 *           example: 4
 *         year:
 *           type: integer
 *           minimum: 2000
 *           example: 2026
 *
 *     UpdateBudgetInput:
 *       type: object
 *       required:
 *         - amount
 *       properties:
 *         amount:
 *           type: number
 *           example: 1500
 *
 *     Budget:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           example: "661f8d4b1e1f2a7d4b2c9f01"
 *         user:
 *           type: string
 *           example: "661f8d4b1e1f2a7d4b2c8e10"
 *         amount:
 *           type: number
 *         spent:
 *           type: number
 *         category:
 *           type: object
 *           nullable: true
 *         month:
 *           type: integer
 *         year:
 *           type: integer
 *
 *     BudgetResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           example: true
 *         message:
 *           type: string
 *           example: Budget created successfully
 *         data:
 *           $ref: '#/components/schemas/Budget'
 *
 *     BudgetsListResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           example: true
 *         count:
 *           type: integer
 *           example: 3
 *         data:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Budget'
 */

router.use(authenticate);

router
  .route("/")
  /**
   * @swagger
   * /budgets:
   *   post:
   *     summary: Create a new budget
   *     tags: [Budgets]
   *     security:
   *       - cookieAuth: []
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/BudgetInput'
   *     responses:
   *       201:
   *         description: Budget created successfully
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/BudgetResponse'
   *       400:
   *         description: Validation error or duplicate budget for same month/category
   *       401:
   *         description: Unauthorized
   */
  .post(validation(createBudgetSchema), createBudget)
  /**
   * @swagger
   * /budgets:
   *   get:
   *     summary: Get all budgets for authenticated user
   *     tags: [Budgets]
   *     security:
   *       - cookieAuth: []
   *     parameters:
   *       - in: query
   *         name: page
   *         schema:
   *           type: integer
   *         description: Page number for pagination
   *       - in: query
   *         name: limit
   *         schema:
   *           type: integer
   *         description: Number of items per page
   *       - in: query
   *         name: sort
   *         schema:
   *           type: string
   *         description: Sort fields (e.g. -year or month)
   *     responses:
   *       200:
   *         description: Budgets retrieved successfully
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/BudgetsListResponse'
   *       401:
   *         description: Unauthorized
   */
  .get(getBudgets);

router
  .route("/:id")
  /**
   * @swagger
   * /budgets/{id}:
   *   get:
   *     summary: Get a budget by ID
   *     tags: [Budgets]
   *     security:
   *       - cookieAuth: []
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: string
   *         description: Budget ID
   *     responses:
   *       200:
   *         description: Budget retrieved successfully
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 success:
   *                   type: boolean
   *                 data:
   *                   $ref: '#/components/schemas/Budget'
   *       401:
   *         description: Unauthorized
   *       404:
   *         description: Budget not found
   */
  .get(validation(deleteOrGetBudgetSchema), getBudgetById)
  /**
   * @swagger
   * /budgets/{id}:
   *   put:
   *     summary: Update budget amount by ID
   *     tags: [Budgets]
   *     security:
   *       - cookieAuth: []
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: string
   *         description: Budget ID
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/UpdateBudgetInput'
   *     responses:
   *       200:
   *         description: Budget updated successfully
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 success:
   *                   type: boolean
   *                 data:
   *                   $ref: '#/components/schemas/Budget'
   *       400:
   *         description: Validation error
   *       401:
   *         description: Unauthorized
   *       404:
   *         description: Budget not found
   */
  .put(validation(updateBudgetSchema), updateBudget)
  /**
   * @swagger
   * /budgets/{id}:
   *   delete:
   *     summary: Delete a budget by ID
   *     tags: [Budgets]
   *     security:
   *       - cookieAuth: []
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: string
   *         description: Budget ID
   *     responses:
   *       200:
   *         description: Budget deleted successfully
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 success:
   *                   type: boolean
   *                 message:
   *                   type: string
   *       401:
   *         description: Unauthorized
   *       404:
   *         description: Budget not found
   */
  .delete(validation(deleteOrGetBudgetSchema), deleteBudget);

export default router;
