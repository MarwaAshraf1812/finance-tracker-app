import express from "express";
import {
  createTransaction,
  getTransactions,
  getTransactionById,
  updateTransaction,
  deleteTransaction,
} from "../controllers/transaction.controller.js";
import { authenticate } from "../middlewares/auth.middleware.js";
import { validation } from "../middlewares/validation.middleware.js";
import {
  createTransactionSchema,
  deleteOrGetTransactionSchema,
  updateTransactionSchema,
} from "../validation/transaction.validation.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Transactions
 *   description: Transaction management APIs
 */
/**
 * @swagger
 * components:
 *   schemas:
 *     TransactionInput:
 *       type: object
 *       required:
 *         - type
 *         - amount
 *       properties:
 *         type:
 *           type: string
 *           enum: [income, expense]
 *           example: expense
 *         amount:
 *           type: number
 *           example: 150.75
 *         category:
 *           type: string
 *           description: Category ID
 *           example: "65f1c2a3b4e7d91f2a4e8891"
 *         description:
 *           type: string
 *           example: "Groceries at supermarket"
 *         date:
 *           type: string
 *           format: date-time
 *           example: "2026-04-17T09:00:00.000Z"
 *         isRecurring:
 *           type: boolean
 *           example: false
 *
 *     UpdateTransactionInput:
 *       type: object
 *       properties:
 *         type:
 *           type: string
 *           enum: [income, expense]
 *           example: income
 *         amount:
 *           type: number
 *           example: 2000
 *         category:
 *           type: string
 *           description: Category ID
 *           example: "65f1c2a3b4e7d91f2a4e8891"
 *         description:
 *           type: string
 *           example: "Freelance payment"
 *         date:
 *           type: string
 *           format: date-time
 *           example: "2026-04-18T09:00:00.000Z"
 *         isRecurring:
 *           type: boolean
 *           example: true
 *
 *     Transaction:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           example: "661f8d4b1e1f2a7d4b2c8e11"
 *         user:
 *           type: string
 *           example: "661f8d4b1e1f2a7d4b2c8e10"
 *         type:
 *           type: string
 *           enum: [income, expense]
 *         amount:
 *           type: number
 *         category:
 *           type: object
 *           nullable: true
 *         description:
 *           type: string
 *         date:
 *           type: string
 *           format: date-time
 *         isRecurring:
 *           type: boolean
 *
 *     TransactionResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           example: true
 *         message:
 *           type: string
 *           example: Transaction created successfully
 *         data:
 *           $ref: '#/components/schemas/Transaction'
 *
 *     TransactionsListResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           example: true
 *         count:
 *           type: integer
 *           example: 10
 *         total:
 *           type: integer
 *           example: 42
 *         data:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Transaction'
 */

router.use(authenticate);

router
  .route("/")
  /**
   * @swagger
   * /transactions:
   *   post:
   *     summary: Create a new transaction
   *     tags: [Transactions]
   *     security:
   *       - cookieAuth: []
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/TransactionInput'
   *     responses:
   *       201:
   *         description: Transaction created successfully
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/TransactionResponse'
   *       400:
   *         description: Validation error
   *       401:
   *         description: Unauthorized
   */
  .post(validation(createTransactionSchema), createTransaction)
  /**
   * @swagger
   * /transactions:
   *   get:
   *     summary: Get all transactions for authenticated user
   *     tags: [Transactions]
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
   *         description: Sort fields (e.g. -date or amount)
   *       - in: query
   *         name: search
   *         schema:
   *           type: string
   *         description: Search in transaction description
   *     responses:
   *       200:
   *         description: Transactions retrieved successfully
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/TransactionsListResponse'
   *       401:
   *         description: Unauthorized
   */
  .get(getTransactions);

router
  .route("/:id")
  /**
   * @swagger
   * /transactions/{id}:
   *   get:
   *     summary: Get a transaction by ID
   *     tags: [Transactions]
   *     security:
   *       - cookieAuth: []
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: string
   *         description: Transaction ID
   *     responses:
   *       200:
   *         description: Transaction retrieved successfully
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 success:
   *                   type: boolean
   *                 data:
   *                   $ref: '#/components/schemas/Transaction'
   *       401:
   *         description: Unauthorized
   *       404:
   *         description: Transaction not found
   */
  .get(validation(deleteOrGetTransactionSchema), getTransactionById)
  /**
   * @swagger
   * /transactions/{id}:
   *   put:
   *     summary: Update a transaction by ID
   *     tags: [Transactions]
   *     security:
   *       - cookieAuth: []
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: string
   *         description: Transaction ID
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/UpdateTransactionInput'
   *     responses:
   *       200:
   *         description: Transaction updated successfully
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 success:
   *                   type: boolean
   *                 message:
   *                   type: string
   *                 data:
   *                   $ref: '#/components/schemas/Transaction'
   *       400:
   *         description: Validation error
   *       401:
   *         description: Unauthorized
   *       404:
   *         description: Transaction not found
   */
  .put(validation(updateTransactionSchema), updateTransaction)
  /**
   * @swagger
   * /transactions/{id}:
   *   delete:
   *     summary: Delete a transaction by ID
   *     tags: [Transactions]
   *     security:
   *       - cookieAuth: []
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: string
   *         description: Transaction ID
   *     responses:
   *       200:
   *         description: Transaction deleted successfully
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
   *         description: Transaction not found
   */
  .delete(validation(deleteOrGetTransactionSchema), deleteTransaction);

export default router;
