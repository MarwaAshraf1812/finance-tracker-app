import express from "express";
import * as controller from "../controllers/recurringTransaction.controller.js";

const router = express.Router();

router.post("/", controller.createRecurring);

export default router;
