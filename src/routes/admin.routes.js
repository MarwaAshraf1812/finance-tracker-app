import express from 'express';
import  * as adminController from '../controllers/admin.controller.js';
import { authenticate } from '../middlewares/auth.middleware.js';
import { authorize } from '../middlewares/authorization.middleware.js';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Admin Analytics
 *   description: Admin system overview and monitoring APIs
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     AdminOverview:
 *       type: object
 *       properties:
 *         totalUsers:
 *           type: integer
 *         totalTransactions:
 *           type: integer
 *         totalRevenue:
 *           type: number
 *         totalExpenses:
 *           type: number
 *     UserAnalytics:
 *       type: object
 *       properties:
 *         totalUsers:
 *           type: integer
 *         newUsers:
 *           type: integer
 *         roles:
 *           type: object
 *           additionalProperties:
 *             type: integer
 *     FinanceAnalytics:
 *       type: object
 *       properties:
 *         totalRevenue:
 *           type: number
 *         totalExpenses:
 *           type: number
 *         netBalance:
 *           type: number
 *         averageTransactionValue:
 *           type: number
 *     CategoryAnalytic:
 *       type: object
 *       properties:
 *         categoryId:
 *           type: string
 *         name:
 *           type: string
 *         totalAmount:
 *           type: number
 *         transactionCount:
 *           type: integer
 *         type:
 *           type: string
 *           enum: [income, expense]
 *     TrendMetric:
 *       type: object
 *       properties:
 *         month:
 *           type: integer
 *         year:
 *           type: integer
 *         income:
 *           type: number
 *         expense:
 *           type: number
 *         netBalance:
 *           type: number
 *     ActivityMetric:
 *       type: object
 *       properties:
 *         userId:
 *           type: string
 *         name:
 *           type: string
 *         email:
 *           type: string
 *         avatar:
 *           type: string
 *         transactionCount:
 *           type: integer
 *         totalSpent:
 *           type: number
 *         totalIncome:
 *           type: number
 *
 *     AdminResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           example: true
 *         data:
 *           type: object
 */

/**
 * @swagger
 * /admin/analytics/overview:
 *   get:
 *     summary: Get system-wide overview
 *     tags: [Admin Analytics]
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: System overview retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/AdminResponse'
 *                 - type: object
 *                   properties:
 *                     data:
 *                       $ref: '#/components/schemas/AdminOverview'
 *       403:
 *         description: Forbidden - Admin access required
 */
router.get('/overview', authenticate, authorize('admin'), adminController.getOverview);

/**
 * @swagger
 * /admin/analytics/users:
 *   get:
 *     summary: Get user analytics
 *     tags: [Admin Analytics]
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: User analytics retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/AdminResponse'
 *                 - type: object
 *                   properties:
 *                     data:
 *                       $ref: '#/components/schemas/UserAnalytics'
 */
router.get('/users', authenticate, authorize('admin'), adminController.getUsers);

/**
 * @swagger
 * /admin/analytics/finance:
 *   get:
 *     summary: Get financial metrics
 *     tags: [Admin Analytics]
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: Finance analytics retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/AdminResponse'
 *                 - type: object
 *                   properties:
 *                     data:
 *                       $ref: '#/components/schemas/FinanceAnalytics'
 */
router.get('/finance', authenticate, authorize('admin'), adminController.getFinance);

/**
 * @swagger
 * /admin/analytics/categories:
 *   get:
 *     summary: Get category stats
 *     tags: [Admin Analytics]
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: Category analytics retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/AdminResponse'
 *                 - type: object
 *                   properties:
 *                     data:
 *                       type: array
 *                       items:
 *                         $ref: '#/components/schemas/CategoryAnalytic'
 */
router.get('/categories', authenticate, authorize('admin'), adminController.getCategories);

/**
 * @swagger
 * /admin/analytics/trends:
 *   get:
 *     summary: Get growth trends
 *     tags: [Admin Analytics]
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: Trend metrics retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/AdminResponse'
 *                 - type: object
 *                   properties:
 *                     data:
 *                       type: array
 *                       items:
 *                         $ref: '#/components/schemas/TrendMetric'
 */
router.get('/trends', authenticate, authorize('admin'), adminController.getTrends);

/**
 * @swagger
 * /admin/analytics/activity:
 *   get:
 *     summary: Get activity metrics
 *     tags: [Admin Analytics]
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: Activity metrics retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/AdminResponse'
 *                 - type: object
 *                   properties:
 *                     data:
 *                       type: array
 *                       items:
 *                         $ref: '#/components/schemas/ActivityMetric'
 */
router.get('/activity', authenticate, authorize('admin'), adminController.getActivity);

export default router;