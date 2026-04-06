import express from "express";
import {
  createTransaction,
  getTransactions,
  getTransactionById,
  updateTransaction,
  deleteTransaction
} from "../controllers/transaction.controller.js";
import { authenticate } from "../middlewares/auth.middleware.js";
import { validation } from "../middlewares/validation.middleware.js";
import { createTransactionSchema, deleteOrGetTransactionSchema, updateTransactionSchema } from "../validation/transaction.validation.js";

const router = express.Router();

router.use(authenticate);

router.route("/")
  .post(validation(createTransactionSchema), createTransaction)
  .get(getTransactions);

router.route("/:id")
  .get(validation(deleteOrGetTransactionSchema), getTransactionById)
  .put(validation(updateTransactionSchema), updateTransaction)
  .delete(validation(deleteOrGetTransactionSchema), deleteTransaction);

export default router;
