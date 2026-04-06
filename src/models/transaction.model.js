import mongoose from "mongoose";

const { Schema } = mongoose;

const transactionSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  type: {
    type: String,
    enum: ["income", "expense"],
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
  },
  description: String,
  date: {
    type: Date,
    default: Date.now,
  },
  isRecurring: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

transactionSchema.index({ user: 1, date: -1 });
transactionSchema.index({ user: 1, category: 1, date: 1 });

const Transaction = mongoose.model("Transaction", transactionSchema);
export default Transaction;
