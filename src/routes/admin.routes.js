import express from 'express';
import  * as adminController from '../controllers/admin.controller.js';
import { authenticate } from '../middlewares/auth.middleware.js';
import { authorize } from '../middlewares/authorization.middleware.js';

const router = express.Router();

router.get('/overview', authenticate, authorize('admin'), adminController.getOverview);
router.get('/users', authenticate, authorize('admin'), adminController.getUsers);
router.get('/finance', authenticate, authorize('admin'), adminController.getFinance);
router.get('/categories', authenticate, authorize('admin'), adminController.getCategories);
router.get('/trends', authenticate, authorize('admin'), adminController.getTrends);


export default router;