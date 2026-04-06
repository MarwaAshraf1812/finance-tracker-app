import mongoose from "mongoose";

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
