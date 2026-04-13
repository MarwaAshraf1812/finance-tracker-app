import * as reportsService from '../services/reports.service.js';

export const generateUserReport = async (req, res) => {
  const userId = req.user.id;
  const { startDate, endDate } = req.query;

  const report = await reportsService.createUserReport(userId, startDate, endDate);

  res.status(200).json({
    success: true,
    data: report
  });
};

export const getTransactionReport = async (req, res) => {
  const userId = req.user.id;
  const { startDate, endDate } = req.query;

  const report = await reportsService.generateTransactionReport(userId, startDate, endDate);

  res.status(200).json({
    success: true,
    data: report
  });
};

export const getBudgetReport = async (req, res) => {
  const userId = req.user.id;
  const { startDate, endDate } = req.query;

  const report = await reportsService.generateBudgetReport(userId, startDate, endDate);

  res.status(200).json({
    success: true,
    data: report
  });
};
