import RecurringTransaction from "../models/recurringTransaction.model.js";

export const createRecurring = async (data) => {
  return await RecurringTransaction.create(data);
};

export const getAllRecurring = (userId) => {
  return RecurringTransaction.find({ user: userId });
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
