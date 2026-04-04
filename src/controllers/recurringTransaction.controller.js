import * as recurringService from "../services/recurringTransaction.service.js";
import { createRecurringSchema } from "../validations/recurringTransaction.validation.js";

export const createRecurring = async (req, res) => {
  const value = await createRecurringSchema.validateAsync(req.body || {});
  const userId = req.user?.id || "507f191e810c19729de860ea";
  const data = { ...value, user: userId };

  const recurring = await recurringService.createRecurring(data);

  res.status(201).json({
    success: true,
    data: recurring,
  });
};

export const getAllRecurring = async (req, res) => {
  const userId = req.user?.id || "507f191e810c19729de860ea";
  const data = await recurringService.getAllRecurring(userId);

  res.status(201).json({
    success: true,
    data,
  });
};
