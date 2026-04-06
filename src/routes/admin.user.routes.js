import { Router } from "express";
import { authenticate } from "../middlewares/auth.middleware.js";
import { authorize } from "../middlewares/authorization.middleware.js";
import * as adminUserController from "../controllers/admin.user.controller.js";
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
  adminUserController.getUserById,
);

router.delete(
  "/users/:id",
  authenticate,
  authorize("admin"),
  adminUserController.deleteUserById,
);

router.put(
  "/users/:id/block",
  authenticate,
  authorize("admin"),
  adminUserController.blockUser,
);

router.put(
  "/users/:id/unblock",
  authenticate,
  authorize("admin"),
  adminUserController.unblockUser,
);

export default router;