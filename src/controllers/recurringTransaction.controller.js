import * as recurringService from "../services/recurringTransaction.service.js";
import {
  createRecurringSchema,
  updateRecurringSchema,
} from "../validations/recurringTransaction.validation.js";

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

  const data = await recurringService.getAllTransactions(userId, req.query);

  res.status(200).json({
    success: true,
    data,
  });
};

export const getRecurringById = async (req, res) => {
  const data = await recurringService.getRecurringById(req.params.id);

  if (!data) {
    const err = new Error("Recurring not found");
    err.statusCode = 404;
    throw err;
  }

  res.status(200).json({
    success: true,
    data,
  });
};

export const updateRecurring = async (req, res) => {
  const value = await updateRecurringSchema.validateAsync(req.body);

  const data = await recurringService.updateRecurring(req.params.id, value);

  if (!data) {
    const err = new Error("Recurring not found");
    err.statusCode = 404;
    throw err;
  }

  res.status(200).json({
    success: true,
    data,
  });
};

export const deleteRecurring = async (req, res) => {
  const data = await recurringService.deleteRecurring(req.params.id);

  if (!data) {
    const err = new Error("Recurring not found");
    err.statusCode = 404;
    throw err;
  }

  res.status(200).json({
    success: true,
    data,
  });
};
