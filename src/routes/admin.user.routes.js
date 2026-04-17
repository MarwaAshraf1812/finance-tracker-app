import { Router } from "express";
import { authenticate } from "../middlewares/auth.middleware.js";
import { authorize } from "../middlewares/authorization.middleware.js";
import { validation } from "../middlewares/validation.middleware.js";
import * as adminUserController from "../controllers/admin.user.controller.js";
import * as adminUserValidation from "../validation/admin.user.validation.js";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Admin - Users
 *   description: Admin APIs for managing users
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     AdminUser:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           example: "64a8c2b1e3f1a2b3c4d5e6f7"
 *         name:
 *           type: string
 *           example: "John Doe"
 *         email:
 *           type: string
 *           format: email
 *           example: "john@example.com"
 *         role:
 *           type: string
 *           enum: [user, admin]
 *           example: "user"
 *         blocked:
 *           type: boolean
 *           example: false
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 *
 *     AdminUsersListResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           example: true
 *         data:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/AdminUser'
 *
 *     AdminUserResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           example: true
 *         data:
 *           $ref: '#/components/schemas/AdminUser'
 */

/**
 * @swagger
 * /admin/users:
 *   get:
 *     summary: Get all users (paginated)
 *     tags: [Admin - Users]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Number of users per page
 *     responses:
 *       200:
 *         description: List of users
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AdminUsersListResponse'
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden – admin access required
 *       404:
 *         description: No users found
 */
router.get(
  "/users",
  authenticate,
  authorize("admin"),
  adminUserController.getAllUsers,
);

/**
 * @swagger
 * /admin/users/{id}:
 *   get:
 *     summary: Get a single user by ID
 *     tags: [Admin - Users]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: MongoDB ObjectId of the user
 *         example: "64a8c2b1e3f1a2b3c4d5e6f7"
 *     responses:
 *       200:
 *         description: User found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AdminUserResponse'
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden – admin access required
 *       404:
 *         description: User not found
 */
router.get(
  "/users/:id",
  authenticate,
  authorize("admin"),
  validation(adminUserValidation.getUserByIdSchema),
  adminUserController.getUserById,
);

/**
 * @swagger
 * /admin/users/{id}:
 *   delete:
 *     summary: Delete a user by ID
 *     tags: [Admin - Users]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: MongoDB ObjectId of the user
 *         example: "64a8c2b1e3f1a2b3c4d5e6f7"
 *     responses:
 *       200:
 *         description: User deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "User deleted successfully"
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden – admin access required
 *       404:
 *         description: User not found
 */
router.delete(
  "/users/:id",
  authenticate,
  authorize("admin"),
  validation(adminUserValidation.getUserByIdSchema),
  adminUserController.deleteUserById,
);

/**
 * @swagger
 * /admin/users/{id}/block:
 *   put:
 *     summary: Block a user by ID
 *     tags: [Admin - Users]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: MongoDB ObjectId of the user
 *         example: "64a8c2b1e3f1a2b3c4d5e6f7"
 *     responses:
 *       200:
 *         description: User blocked successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "User blocked successfully"
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden – admin access required
 *       404:
 *         description: User not found
 */
router.put(
  "/users/:id/block",
  authenticate,
  authorize("admin"),
  validation(adminUserValidation.getUserByIdSchema),
  adminUserController.blockUser,
);

/**
 * @swagger
 * /admin/users/{id}/unblock:
 *   put:
 *     summary: Unblock a user by ID
 *     tags: [Admin - Users]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: MongoDB ObjectId of the user
 *         example: "64a8c2b1e3f1a2b3c4d5e6f7"
 *     responses:
 *       200:
 *         description: User unblocked successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "User unblocked successfully"
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden – admin access required
 *       404:
 *         description: User not found
 */
router.put(
  "/users/:id/unblock",
  authenticate,
  authorize("admin"),
  validation(adminUserValidation.getUserByIdSchema),
  adminUserController.unblockUser,
);

export default router;