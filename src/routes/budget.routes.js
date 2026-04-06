import express from "express";
import {
  createBudget,
  getBudgets,
  getBudgetById,
  updateBudget,
  deleteBudget
} from "../controllers/budget.controller.js";
import { authenticate } from "../middlewares/auth.middleware.js";
import { validation } from "../middlewares/validation.middleware.js";
import { createBudgetSchema, updateBudgetSchema, deleteOrGetBudgetSchema } from "../validation/budget.validation.js";

const router = express.Router();

router.use(authenticate);

router.route("/")
  .post(validation(createBudgetSchema), createBudget)
  .get(getBudgets);

router.route("/:id")
  .get(validation(deleteOrGetBudgetSchema), getBudgetById)
  .put(validation(updateBudgetSchema), updateBudget)
  .delete(validation(deleteOrGetBudgetSchema), deleteBudget);

export default router;
