import express from 'express';
import { generateUserReport, getTransactionReport, getBudgetReport } from '../controllers/reports.controller.js';
import { authenticate } from '../middlewares/auth.middleware.js';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Reports
 *   description: Financial report APIs
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     FinancialSummary:
 *       type: object
 *       properties:
 *         totalIncomes:
 *           type: number
 *         totalExpenses:
 *           type: number
 *         netSavings:
 *           type: number
 *         savingRates:
 *           type: string
 *           example: "15.50%"
 *     BudgetAnalysis:
 *       type: object
 *       properties:
 *         highestBudgetCategories:
 *           type: string
 *         lowestBudgetCategories:
 *           type: string
 *         totalActiveBudgets:
 *           type: integer
 *
 *     ReportResponse:
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
 * /reports:
 *   get:
 *     summary: Get comprehensive user report
 *     tags: [Reports]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: query
 *         name: startDate
 *         schema: { type: string, format: date }
 *       - in: query
 *         name: endDate
 *         schema: { type: string, format: date }
 *     responses:
 *       200:
 *         description: Report generated successfully
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/ReportResponse'
 *                 - type: object
 *                   properties:
 *                     data:
 *                       type: object
 *                       properties:
 *                         financialSummary:
 *                           $ref: '#/components/schemas/FinancialSummary'
 *                         budgetAnalysis:
 *                           $ref: '#/components/schemas/BudgetAnalysis'
 */
router.get('/', authenticate, generateUserReport);

/**
 * @swagger
 * /reports/transactions-summary:
 *   get:
 *     summary: Get transaction summary
 *     tags: [Reports]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: query
 *         name: startDate
 *         schema: { type: string, format: date }
 *       - in: query
 *         name: endDate
 *         schema: { type: string, format: date }
 *     responses:
 *       200:
 *         description: Transaction summary retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/ReportResponse'
 *                 - type: object
 *                   properties:
 *                     data:
 *                       $ref: '#/components/schemas/FinancialSummary'
 */
router.get('/transactions-summary', authenticate, getTransactionReport);

/**
 * @swagger
 * /reports/budgets-summary:
 *   get:
 *     summary: Get budget analysis
 *     tags: [Reports]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: query
 *         name: startDate
 *         schema: { type: string, format: date }
 *       - in: query
 *         name: endDate
 *         schema: { type: string, format: date }
 *     responses:
 *       200:
 *         description: Budget analysis retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/ReportResponse'
 *                 - type: object
 *                   properties:
 *                     data:
 *                       $ref: '#/components/schemas/BudgetAnalysis'
 */
router.get('/budgets-summary', authenticate, getBudgetReport);

export default router;


