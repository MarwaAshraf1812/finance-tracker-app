import express from "express";
import * as controller from "../controllers/recurringTransaction.controller.js";
import { authenticate } from "../middlewares/auth.middleware.js";
import { validation } from "../middlewares/validation.middleware.js";
import {
  createRecurringSchema,
  updateRecurringSchema,
} from "../validation/recurringTransaction.validation.js";

const router = express.Router();

router.use(authenticate);
router
  .route("/")
  .get(controller.getAllRecurring)
  .post(validation(createRecurringSchema), controller.createRecurring);

router
  .route("/:id")
  .get(controller.getRecurringById)
  .put(validation(updateRecurringSchema), controller.updateRecurring)
  .delete(controller.deleteRecurring);

export default router;
