import Transaction from "../models/transaction.model.js";
import Budget from "../models/budget.model.js";
import { APIFeatures } from "../utils/apiFeatures.js";
import { createError } from "../utils/error.js";

/* 
@desc    Create a new transaction
@route   POST /api/v1/transactions
@access  Private
*/
export const createTransaction = async (req, res, next) => {
  const { type, amount, category, description, date, isRecurring } = req.body;

  const transaction = await Transaction.create({
    user: req.user.id,
    type,
    amount,
    category,
    description,
    date,
    isRecurring,
  });

  let message = "Transaction created successfully";
  let alert = null;

  // Track spending vs budget if it is an expense
  if (type === "expense") {
    const transactionDate = new Date(date || Date.now());
    const month = transactionDate.getMonth() + 1;
    const year = transactionDate.getFullYear();

    // Check for category specific budget first
    let budget = null;
    if (category) {
      budget = await Budget.findOne({ user: req.user.id, month, year, category });
    }

    if (!budget) {
      budget = await Budget.findOne({ user: req.user.id, month, year, category: null });
    }

    if (budget) {
      budget.spent += Number(amount);
      await budget.save();

      if (budget.spent > budget.amount) {
        alert = `Warning: You have exceeded your budget! Budget Limit: ${budget.amount}, Spent: ${budget.spent}`;
      } else if (budget.spent > budget.amount * 0.9) {
        alert = `Warning: You are very close to exceeding your budget. Budget Limit: ${budget.amount}, Spent: ${budget.spent}`;
      }
    }
  }

  res.status(201).json({
    success: true,
    message,
    alert,
    data: transaction,
  });
};

/* 
@desc    Get all transactions for the logged-in user
@route   GET /api/v1/transactions
@access  Private
*/
export const getTransactions = async (req, res, next) => {
  const features = new APIFeatures(Transaction.find({ user: req.user.id }).populate("category", "type icon color"), req.query)
    .filter()
    .search()
    .sort()
    .paginate();

  const transactions = await features.query;

  const totalTransactions = await Transaction.countDocuments({ user: req.user.id });

  res.status(200).json({
    success: true,
    count: transactions.length,
    total: totalTransactions,
    data: transactions,
  });
};

/* 
@desc    Get a single transaction
@route   GET /api/v1/transactions/:id
@access  Private
*/
export const getTransactionById = async (req, res, next) => {
  const transaction = await Transaction.findOne({ _id: req.params.id, user: req.user.id }).populate("category", "type icon color");

  if (!transaction) {
    return next(createError(404, "Transaction not found"));
  }

  res.status(200).json({
    success: true,
    data: transaction,
  });
};

/* 
@desc    Update a transaction
@route   PUT /api/v1/transactions/:id
@access  Private
*/
export const updateTransaction = async (req, res, next) => {
  const transaction = await Transaction.findOne({ _id: req.params.id, user: req.user.id });

  if (!transaction) {
    return next(createError(404, "Transaction not found"));
  }

  const oldAmount = transaction.amount;
  const oldType = transaction.type;
  const oldCategory = transaction.category;
  const oldDate = new Date(transaction.date);

  const { type, amount, category, description, date, isRecurring } = req.body;

  // Revert old transaction impact from old budget
  if (oldType === "expense") {
    const oldMonth = oldDate.getMonth() + 1;
    const oldYear = oldDate.getFullYear();
    let oldBudget = null;
    if (oldCategory) {
      oldBudget = await Budget.findOne({ user: req.user.id, month: oldMonth, year: oldYear, category: oldCategory });
    }
    if (!oldBudget) {
      oldBudget = await Budget.findOne({ user: req.user.id, month: oldMonth, year: oldYear, category: null });
    }
    if (oldBudget) {
      oldBudget.spent = Math.max(0, oldBudget.spent - oldAmount);
      await oldBudget.save();
    }
  }

  // Apply new transaction using incoming data
  transaction.type = type || transaction.type;
  transaction.amount = amount !== undefined ? amount : transaction.amount;
  if (category !== undefined) transaction.category = category;
  if (description !== undefined) transaction.description = description;
  if (date !== undefined) transaction.date = date;
  if (isRecurring !== undefined) transaction.isRecurring = isRecurring;

  await transaction.save();

  let alert = null;
  
  if (transaction.type === "expense") {
    const newDate = new Date(transaction.date);
    const newMonth = newDate.getMonth() + 1;
    const newYear = newDate.getFullYear();
    let newBudget = null;
    if (transaction.category) {
      newBudget = await Budget.findOne({ user: req.user.id, month: newMonth, year: newYear, category: transaction.category });
    }
    if (!newBudget) {
      newBudget = await Budget.findOne({ user: req.user.id, month: newMonth, year: newYear, category: null });
    }
    if (newBudget) {
      newBudget.spent += Number(transaction.amount);
      await newBudget.save();

      if (newBudget.spent > newBudget.amount) {
        alert = `Warning: You have exceeded your budget! Budget Limit: ${newBudget.amount}, Spent: ${newBudget.spent}`;
      } else if (newBudget.spent > newBudget.amount * 0.9) {
        alert = `Warning: You are very close to exceeding your budget. Budget Limit: ${newBudget.amount}, Spent: ${newBudget.spent}`;
      }
    }
  }

  res.status(200).json({
    success: true,
    message: "Transaction updated successfully",
    alert,
    data: transaction,
  });
};

/* 
@desc    Delete a transaction
@route   DELETE /api/v1/transactions/:id
@access  Private
*/
export const deleteTransaction = async (req, res, next) => {
  const transaction = await Transaction.findOneAndDelete({ _id: req.params.id, user: req.user.id });

  if (!transaction) {
    return next(createError(404, "Transaction not found"));
  }

  // Adjust budget if it was an expense
  if (transaction.type === "expense") {
    const transactionDate = new Date(transaction.date);
    const month = transactionDate.getMonth() + 1;
    const year = transactionDate.getFullYear();

    let budget = null;
    if (transaction.category) {
      budget = await Budget.findOne({ user: req.user.id, month, year, category: transaction.category });
    }
    if (!budget) {
      budget = await Budget.findOne({ user: req.user.id, month, year, category: null });
    }

    if (budget) {
      budget.spent = Math.max(0, budget.spent - transaction.amount);
      await budget.save();
    }
  }

  res.status(200).json({
    success: true,
    message: "Transaction deleted successfully",
  });
};
