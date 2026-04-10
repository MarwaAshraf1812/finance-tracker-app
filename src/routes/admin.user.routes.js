import { Router } from "express";
import { authenticate } from "../middlewares/auth.middleware.js";
import { authorize } from "../middlewares/authorization.middleware.js";
import { validation } from "../middlewares/validation.middleware.js";
import * as adminUserController from "../controllers/admin.user.controller.js";
import * as adminUserValidation from "../validation/admin.user.validation.js";
const router = Router();

router.get(
  "/users",
  authenticate,
  authorize("admin"),
  adminUserController.getAllUsers,
);

router.get(
  "/users/:id",
  authenticate,
  authorize("admin"),
  validation(adminUserValidation.getUserByIdSchema),
  adminUserController.getUserById,
);

router.delete(
  "/users/:id",
  authenticate,
  authorize("admin"),
  validation(adminUserValidation.getUserByIdSchema),
  adminUserController.deleteUserById,
);

router.put(
  "/users/:id/block",
  authenticate,
  authorize("admin"),
  validation(adminUserValidation.getUserByIdSchema),
  adminUserController.blockUser,
);

router.put(
  "/users/:id/unblock",
  authenticate,
  authorize("admin"),
  validation(adminUserValidation.getUserByIdSchema),
  adminUserController.unblockUser,
);

export default router;
