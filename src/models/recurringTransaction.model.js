import mongoose from "mongoose";

/**
 * @swagger
 * components:
 *   schemas:
 *     RecurringTransaction:
 *       type: object
 *       required:
 *         - user
 *         - amount
 *         - type
 *         - category
 *         - frequency
 *         - nextDate
 *       properties:
 *         _id:
 *           type: string
 *           example: "65f1c2a3"
 *         user:
 *           type: string
 *           example: "64a8c2b1"
 *         amount:
 *           type: number
 *           example: 1000
 *         type:
 *           type: string
 *           enum: [income, expense]
 *           example: "expense"
 *         category:
 *           type: string
 *           example: "65f1c2a3"
 *         frequency:
 *           type: string
 *           enum: [daily, weekly, monthly]
 *           example: "monthly"
 *         nextDate:
 *           type: string
 *           format: date-time
 *           example: "2024-05-01T00:00:00.000Z"
 *         description:
 *           type: string
 *           example: "Monthly rent"
 *         active:
 *           type: boolean
 *           default: true
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 *
 *     CreateRecurringInput:
 *       type: object
 *       required:
 *         - amount
 *         - type
 *         - category
 *         - frequency
 *         - nextDate
 *       properties:
 *         amount:
 *           type: number
 *         type:
 *           type: string
 *           enum: [income, expense]
 *         category:
 *           type: string
 *         frequency:
 *           type: string
 *           enum: [daily, weekly, monthly]
 *         nextDate:
 *           type: string
 *           format: date-time
 *         description:
 *           type: string
 *
 *     UpdateRecurringInput:
 *       type: object
 *       properties:
 *         amount:
 *           type: number
 *         type:
 *           type: string
 *           enum: [income, expense]
 *         category:
 *           type: string
 *         frequency:
 *           type: string
 *           enum: [daily, weekly, monthly]
 *         nextDate:
 *           type: string
 *           format: date-time
 *         description:
 *           type: string
 *         active:
 *           type: boolean
 *
 *     RecurringResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *         data:
 *           $ref: '#/components/schemas/RecurringTransaction'
 *
 *     RecurringListResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *         count:
 *           type: number
 *         data:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/RecurringTransaction'
 */

const recurringTransactionSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User is required"],
    },

    amount: {
      type: Number,
      required: [true, "Amount is required"],
      min: [0, "Amount must be greater than or equal to 0"],
    },

    type: {
      type: String,
      enum: {
        values: ["income", "expense"],
        message: "Type must be either 'income' or 'expense'",
      },
      required: [true, "Transaction type is required"],
    },

    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: [true, "Category is required"],
    },

    frequency: {
      type: String,
      enum: {
        values: ["daily", "weekly", "monthly"],
        message: "Frequency must be daily, weekly, or monthly",
      },
      required: [true, "Frequency is required"],
    },

    nextDate: {
      type: Date,
      required: [true, "Next date is required"],
    },

    description: {
      type: String,
      trim: true,
      MaxLength: [200, "Description cannot exceed 200 characters"],
    },

    active: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  },
);

const RecurringTransaction = mongoose.model(
  "RecurringTransaction",
  recurringTransactionSchema,
);

export default RecurringTransaction;
