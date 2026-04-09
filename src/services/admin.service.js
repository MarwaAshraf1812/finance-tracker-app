import { User } from '../models/user.model.js';
import { Transaction } from '../models/transaction.model.js';
import logger from '../logger/logger.service.js';

export const getSystemOverview = async () => {
  try {
    const [totalUsers, totalTransactions, stats] = await Promise.all([
      User.countDocuments(),
      Transaction.countDocuments(),
      Transaction.aggregate([
        {
          $group: {
            _id: null,
            totalRevenue: { $sum: { $cond: [{ $eq: ['$type', 'income'] }, '$amount', 0] } },
            totalExpenses: { $sum: { $cond: [{ $eq: ['$type', 'expense'] }, '$amount', 0] } }
          }
        }
      ])
    ]);

    return {
      totalUsers,
      totalTransactions,
      totalRevenue: stats[0]?.totalRevenue || 0,
      totalExpenses: stats[0]?.totalExpenses || 0,
    };
  } catch (error) {
    logger.error(`Database error in getSystemOverview: ${error.message}`);
    throw error;
  }
}


export const getUserAnalytics = async () => {
  try {
    const thirtyDayAgo = new Date();
    thirtyDayAgo.setDate(thirtyDayAgo.getDate() - 30);
    const stats = await User.aggregate([
      {
        $facet: {
          "roles": [{ $group: { _id: '$role', count: { $sum: 1 } } }],
          "recentGrowth": [
            { $match: { createdAt: { $gte: thirtyDayAgo } } },
            { $count: "newUsers" }
          ],
          "totalUsers": [{ $count: "total" }]
        }
      }
    ]);

    return {
      totalUsers: stats[0].totalUsers[0]?.total || 0,
      newUsers: stats[0].recentGrowth[0]?.newUsers || 0,
      roles: stats[0].roles.reduce((acc, role) => {
        acc[role._id] = role.count;
        return acc;
      }, {})
    }
  } catch (error) {
    logger.error(`Database error in getUserAnalytics: ${error.message}`);
    throw error;
  }
}

export const getFinanceAnalytics = async () => {
  try {
    const stats = await Transaction.aggregate([
      {
        $facet: {
          "overview": [
            {
              $group: {
                _id: null,
                totalRevenue: { $sum: { $cond: [{ $eq: ['$type', 'income'] }, '$amount', 0] } },
                totalExpenses: { $sum: { $cond: [{ $eq: ['$type', 'expense'] }, '$amount', 0] } },
                averageTransaction: { $avg: '$amount' }
              }
            }
          ]
        }
      }
    ]);

    const overview = stats[0].overview[0] || { totalRevenue: 0, totalExpenses: 0, averageTransaction: 0 };
    const netBalance = overview.totalRevenue - overview.totalExpenses;

    return {
      totalRevenue: overview.totalRevenue,
      totalExpenses: overview.totalExpenses,
      netBalance,
      averageTransactionValue: Math.round(overview.averageTransaction || 0),
    };

  } catch (error) {
    logger.error(`Database error in getFinanceAnalytics: ${error.message}`);
    throw error;
  }
}


export const getTrends = async () => {
  try {
    const stats = await Transaction.aggregate([
      {
        $project: {
          month: { $month: "$date" },
          year: { $year: "$date" },
          amount: 1,
          type: 1
        }
      },
      {
        $group: {
          _id: { month: "$month", year: "$year" },
          income: { $sum: { $cond: [{ $eq: ['$type', 'income'] }, '$amount', 0] } }, // تم إضافة $ قبل eq
          expense: { $sum: { $cond: [{ $eq: ['$type', 'expense'] }, '$amount', 0] } }, // تم إضافة $ قبل eq
        }
      },
      { $sort: { "_id.year": 1, "_id.month": 1 } },
      {
        $project: {
          _id: 0,
          month: "$_id.month",
          year: "$_id.year",
          income: 1,
          expense: 1,
          netBalance: { $subtract: ["$income", "$expense"] }
        }
      }
    ]);
    return stats;
  } catch (error) {
    logger.error(`Error in getTrends: ${error.message}`);
    throw error;
  }
}

export const getCategoriesAnalytics = async () => {
  try {
    const stats = await Transaction.aggregate([
      {
        $group: {
          _id: '$category',
          totalAmount: { $sum: '$amount' },
          transactionCount: { $sum: 1 },
          type: { $first: '$type' },
        }
      },
      {
        $sort: { totalAmount: -1 }
      },
      {
        $lookup: {
          from: 'categories',
          localField: '_id',
          foreignField: '_id',
          as: 'categoryInfo'
        }
      },
      { $unwind: '$categoryInfo' },
      {
        $project: {
          _id: 0,
          categoryId: "$_id",
          name: "$categoryInfo.name",
          totalAmount: 1,
          transactionCount: 1,
          type: 1
        }
      }
    ])
    return stats;
  } catch (error) {
    logger.error(`Error in getCategoriesAnalytics: ${error.message}`);
    throw error;
  }
}
