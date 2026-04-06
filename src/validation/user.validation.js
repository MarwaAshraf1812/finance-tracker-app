import joi from "joi";
import { generalFields } from "../utils/globalVariables.js";

export const updateUserSchema = joi.object({
    name : joi.string().min(3).max(30),
    email : joi.string().email(),
}).required();

export const changePasswordSchema = joi.object({
    oldPassword : joi.string().min(6).required(),
    newPassword : joi.string().min(6).required(),
}).required()

export const avatarSchema = joi.object({
    attachment : generalFields.attachment.required()
}).required()