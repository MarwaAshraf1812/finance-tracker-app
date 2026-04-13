import mongoose from 'mongoose';
import Transaction from '../models/transaction.model.js';
import Budget from '../models/budget.model.js';
import { createError } from '../utils/error.js';

const getTransactionSummary = async (userID, start, end) => {
  const transactions = await Transaction.aggregate([
    { $match: { user: userID, date: { $gte: start, $lte: end } } },
    {
      $group: {
        _id: '$type',
        totalAmount: { $sum: '$amount' },
        count: { $sum: 1 },
      }
    }
  ]);

  const totalIncomes = transactions.find(t => t._id === 'income')?.totalAmount || 0;
  const totalExpenses = transactions.find(t => t._id === 'expense')?.totalAmount || 0;
  const netSavings = totalIncomes - totalExpenses;
  const savingRates = totalIncomes > 0 ? ((netSavings / totalIncomes) * 100).toFixed(2) : 0;

  return {
    totalIncomes,
    totalExpenses,
    netSavings,
    savingRates: `${savingRates}%`,
  };
};

const getBudgetAnalysis = async (userID, start, end) => {
  const budgets = await Budget.aggregate([
    { 
      $match: { 
        user: userID,
        $expr: {
          $and: [
            { $gte: [ { $add: [ { $multiply: ["$year", 12] }, "$month" ] }, start.getFullYear() * 12 + start.getMonth() + 1 ] },
            { $lte: [ { $add: [ { $multiply: ["$year", 12] }, "$month" ] }, end.getFullYear() * 12 + end.getMonth() + 1 ] }
          ]
        }
      } 
    },
    {
      $group: {
        _id: '$category',
        totalAmount: { $sum: '$amount' },
      }
    },
    {
      $lookup: {
        from: 'categories',
        localField: '_id',
        foreignField: '_id',
        as: 'categoryInfo'
      }
    },
    {
      $unwind: {
        path: '$categoryInfo',
        preserveNullAndEmptyArrays: true
      }
    },
    {
      $project: {
        _id: 1,
        totalAmount: 1,
        name: { $ifNull: ['$categoryInfo.type', 'Uncategorized'] }
      }
    },
    { $sort: { totalAmount: -1 } }
  ]);

  const highestBudgetCategories = budgets.length > 0 ? budgets[0].name : "No Categories";
  const lowestBudgetCategories = budgets.length > 0 ? budgets[budgets.length - 1].name : "No Categories";

  return {
    highestBudgetCategories,
    lowestBudgetCategories,
    totalActiveBudgets: budgets.length
  };
};

const parseReportParams = (userId, startDate, endDate) => {
  const start = startDate ? new Date(startDate) : new Date(new Date().setMonth(new Date().getMonth() - 1));
  const end = endDate ? new Date(endDate) : new Date();
  const userID = new mongoose.Types.ObjectId(userId);
  return { start, end, userID };
};

export const generateTransactionReport = async (userId, startDate, endDate) => {
  try {
    const { start, end, userID } = parseReportParams(userId, startDate, endDate);
    return await getTransactionSummary(userID, start, end);
  } catch (error) {
    if (error.status) throw error;
    throw createError(500, `Error generating transaction report: ${error.message}`);
  }
};

export const generateBudgetReport = async (userId, startDate, endDate) => {
  try {
    const { start, end, userID } = parseReportParams(userId, startDate, endDate);
    return await getBudgetAnalysis(userID, start, end);
  } catch (error) {
    if (error.status) throw error;
    throw createError(500, `Error generating budget report: ${error.message}`);
  }
};

export const createUserReport = async (userId, startDate, endDate) => {
  try {
    const { start, end, userID } = parseReportParams(userId, startDate, endDate);

    const [financialSummary, budgetAnalysis] = await Promise.all([
      getTransactionSummary(userID, start, end),
      getBudgetAnalysis(userID, start, end)
    ]);

    return {
      financialSummary,
      budgetAnalysis
    };

  } catch (error) {
    if (error.status) throw error;
    throw createError(500, `Error generating user report: ${error.message}`);
  }
};