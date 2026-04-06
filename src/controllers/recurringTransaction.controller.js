import * as recurringService from "../services/recurringTransaction.service.js";
import { createError } from "../utils/error.js";

export const createRecurring = async (req, res) => {
  const userId = req.user.id;
  const data = { ...req.body, user: userId };

  const recurring = await recurringService.createRecurring(data);

  res.status(201).json({
    success: true,
    data: recurring,
  });
};

export const getAllRecurring = async (req, res) => {
  const userId = req.user.id;

  const data = await recurringService.getAllTransactions(userId, req.query);

  res.status(200).json({
    success: true,
    data,
  });
};

export const getRecurringById = async (req, res) => {
  const data = await recurringService.getRecurringById(
    req.params.id,
    req.user.id,
  );

  if (!data) {
    throw createError(404, "Recurring not found");
  }

  res.status(200).json({
    success: true,
    data,
  });
};

export const updateRecurring = async (req, res) => {
  const data = await recurringService.updateRecurring(
    req.params.id,
    req.user.id,
    req.body,
  );

  if (!data) {
    throw createError(404, "Recurring not found");
  }

  res.status(200).json({
    success: true,
    data,
  });
};

export const deleteRecurring = async (req, res) => {
  const data = await recurringService.deleteRecurring(
    req.params.id,
    req.user.id,
  );

  if (!data) {
    throw createError(404, "Recurring not found");
  }

  res.status(200).json({
    success: true,
    data,
  });
};
