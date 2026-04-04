import express from "express";
import * as controller from "../controllers/recurringTransaction.controller.js";

const router = express.Router();

router
  .route("/")
  .get(controller.getAllRecurring)
  .post(controller.createRecurring);

router.route("/:id").get(controller.getRecurringById);

export default router;
