import * as adminService from '../services/admin.service.js';

export const getOverview = async (req, res) => {
  const overview = await adminService.getSystemOverview();
  res.status(200).json({
    success: true,
    data: overview
  })
}

export const getUsers = async(req, res) => {
  const analytics = await adminService.getUserAnalytics();
  res.status(200).json({
    success: true,
    data: analytics
  })
}

export const getFinance = async(req,res) => {
  const analytics = await adminService.getFinanceAnalytics();
  res.status(200).json({
    success: true,
    data: analytics
  })
}

export const getCategories = async(req,res) => {
  const analytics = await adminService.getCategoriesAnalytics();
  res.status(200).json({
    success: true,
    data: analytics
  })
}

export const getTrends = async(req,res) => {
  const analytics = await adminService.getTrends();
  res.status(200).json({
    success: true,
    data: analytics
  })
}