import express from "express";
import * as controller from "../controllers/recurringTransaction.controller.js";
import { authenticate } from "../middlewares/auth.middleware.js";
import { validation } from "../middlewares/validation.middleware.js";
import {
  createRecurringSchema,
  updateRecurringSchema,
} from "../validation/recurringTransaction.validation.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: RecurringTransactions
 *   description: Recurring transaction management APIs
 */

router.use(authenticate);

router
  .route("/")
  /**
   * @swagger
   * /recurring:
   *   get:
   *     summary: Get all recurring transactions
   *     tags: [RecurringTransactions]
   *     security:
   *       - bearerAuth: []
   *     parameters:
   *       - in: query
   *         name: page
   *         schema:
   *           type: integer
   *         description: "Page number (default: 1)"
   *       - in: query
   *         name: limit
   *         schema:
   *           type: integer
   *         description: "Number of items per page (default: 5)"
   *       - in: query
   *         name: sort
   *         schema:
   *           type: string
   *         description: "Sort fields (e.g., amount,-createdAt)"
   *       - in: query
   *         name: search
   *         schema:
   *           type: string
   *         description: "Search in description"
   *       - in: query
   *         name: type
   *         schema:
   *           type: string
   *           enum: [income, expense]
   *         description: "Filter by transaction type"
   *       - in: query
   *         name: frequency
   *         schema:
   *           type: string
   *           enum: [daily, weekly, monthly]
   *         description: "Filter by frequency"
   *       - in: query
   *         name: active
   *         schema:
   *           type: boolean
   *         description: "Filter by active status"
   *       - in: query
   *         name: minAmount
   *         schema:
   *           type: number
   *         description: "Minimum amount filter"
   *       - in: query
   *         name: maxAmount
   *         schema:
   *           type: number
   *         description: "Maximum amount filter"
   *       - in: query
   *         name: startDate
   *         schema:
   *           type: string
   *           format: date
   *         description: "Filter by start date"
   *       - in: query
   *         name: endDate
   *         schema:
   *           type: string
   *           format: date
   *         description: "Filter by end date"
   *     responses:
   *       200:
   *         description: List of recurring transactions
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/RecurringListResponse'
   *       401:
   *         description: Unauthorized
   */
  .get(controller.getAllRecurring)
  /**
   * @swagger
   * /recurring:
   *   post:
   *     summary: Create a new recurring transaction
   *     tags: [RecurringTransactions]
   *     security:
   *       - bearerAuth: []
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/CreateRecurringInput'
   *     responses:
   *       201:
   *         description: Recurring transaction created successfully
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/RecurringResponse'
   *       400:
   *         description: Validation error
   *       401:
   *         description: Unauthorized
   */
  .post(validation(createRecurringSchema), controller.createRecurring);

router
  .route("/:id")
  /**
   * @swagger
   * /recurring/{id}:
   *   get:
   *     summary: Get recurring transaction by ID
   *     tags: [RecurringTransactions]
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
   *         description: Recurring transaction found
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/RecurringResponse'
   *       403:
   *         description: Not authorized
   *       404:
   *         description: Recurring transaction not found
   */
  .get(controller.getRecurringById)
  /**
   * @swagger
   * /recurring/{id}:
   *   put:
   *     summary: Update a recurring transaction
   *     tags: [RecurringTransactions]
   *     security:
   *       - bearerAuth: []
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: string
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/UpdateRecurringInput'
   *     responses:
   *       200:
   *         description: Recurring transaction updated
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/RecurringResponse'
   *       403:
   *         description: Not authorized
   *       404:
   *         description: Recurring transaction not found
   */
  .put(validation(updateRecurringSchema), controller.updateRecurring)
  /**
   * @swagger
   * /recurring/{id}:
   *   delete:
   *     summary: Delete a recurring transaction
   *     tags: [RecurringTransactions]
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
   *         description: Recurring transaction deleted
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 success:
   *                   type: boolean
   *                 message:
   *                   type: string
   *       403:
   *         description: Not authorized
   *       404:
   *         description: Recurring transaction not found
   */
  .delete(controller.deleteRecurring);

export default router;
