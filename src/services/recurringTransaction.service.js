import RecurringTransaction from "../models/recurringTransaction.model.js";
import { APIFeatures } from "../utils/apiFeatures.js";

export const createRecurring = async (data) => {
  return await RecurringTransaction.create(data);
};

export const getAllRecurring = (userId) => {
  return RecurringTransaction.find({ user: userId });
};

export const getAllTransactions = async (userId, queryString) => {
  const features = new APIFeatures(
    RecurringTransaction.find({ user: userId }),
    queryString,
  )
    .filter()
    .search()
    .sort()
    .paginate();

  const transactions = await features.query;

  return transactions;
};

export const getRecurringById = (id) => {
  return RecurringTransaction.findById(id);
};

export const updateRecurring = (id, data) => {
  return RecurringTransaction.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });
};

export const deleteRecurring = (id) => {
  return RecurringTransaction.findByIdAndDelete(id);
};
