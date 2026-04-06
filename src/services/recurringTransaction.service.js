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

export const getRecurringById = async (id, userId) => {
  const data = await RecurringTransaction.find({ _id: id, user: userId });
  if (!data) return null;
  return data[0];
};

export const updateRecurring = async (id, userId, data) => {
  return await RecurringTransaction.findOneAndUpdate(
    { _id: id, user: userId },
    data,
    {
      new: true,
      runValidators: true,
    },
  );
};

export const deleteRecurring = async (id, userId) => {
  return await RecurringTransaction.findOneAndDelete({
    _id: id,
    user: userId,
  });
};
