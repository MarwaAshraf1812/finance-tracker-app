import express from 'express';
import { generateUserReport, getTransactionReport, getBudgetReport } from '../controllers/reports.controller.js';
import { authenticate } from '../middlewares/auth.middleware.js';

const router = express.Router();

router.get('/', authenticate, generateUserReport);
router.get('/transactions-summary', authenticate, getTransactionReport);
router.get('/budgets-summary', authenticate, getBudgetReport);

export default router;
