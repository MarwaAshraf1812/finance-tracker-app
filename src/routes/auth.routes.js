import { Router } from "express";
import * as authController from "../controllers/auth.controller.js";
import { validation } from "../middlewares/validation.middleware.js";
import { registerSchema, loginSchema, resetPasswordSchema , resetPasswordConfirmSchema} from "../validation/auth.validation.js";

const router = Router();


router.post("/register",validation(registerSchema),authController.registerUser);
router.post("/login",validation(loginSchema),authController.loginUser);
router.post("/logout", authController.logoutUser);
router.post("/register-admin", validation(registerSchema), authController.registerAdmin);
router.post("/reset-password",validation(resetPasswordSchema),authController.resetPassword);
router.post("/reset-password-confirm/:token", validation(resetPasswordConfirmSchema), authController.resetPasswordConfirm);

export default router;