import { Router } from "express";
import { authenticate } from "../middlewares/auth.middleware.js";
import { authorize } from "../middlewares/authorization.middleware.js";
import * as userController from "../controllers/user.controller.js";
import { validation } from "../middlewares/validation.middleware.js";
import {
  updateUserSchema,
  avatarSchema,
  changePasswordSchema,
} from "../validation/user.validation.js";
import { cloudUpload } from "../config/multerConfig.js";

const router = Router();

router.get(
  "/profile",
  authenticate,
  userController.getProfile,
);

router.put(
  "/profile",
  authenticate,
  validation(updateUserSchema),
  userController.updateProfile,
);

router.delete(
  "/profile",
  authenticate,
  userController.deleteUser,
);

router.put(
  "/profile/password",
  authenticate,
  validation(changePasswordSchema),
  userController.changePassword,
);

router.put(
  "/profile/avatar",
  authenticate,
  cloudUpload(["image/png", "image/jpeg"]).single("image"),
  validation(avatarSchema),
  userController.uploadAvatar,
);

router.delete(
  "/profile/avatar",
  authenticate,
  userController.deleteAvatar,
);

export default router;
