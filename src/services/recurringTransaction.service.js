import RecurringTransaction from "../models/recurringTransaction.model.js";

export const createRecurring = async (data) => {
  return await RecurringTransaction.create(data);
};

export const getAllRecurring = (userId) => {
  return RecurringTransaction.find({ user: userId });
};
