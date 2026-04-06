import Joi from "joi";

export const createRecurringSchema = Joi.object({
  amount: Joi.number().min(0).required(),
  type: Joi.string().valid("income", "expense").required(),
  category: Joi.string().required(),
  frequency: Joi.string().valid("daily", "weekly", "monthly").required(),
  nextDate: Joi.date().required(),
  description: Joi.string().max(200).allow(""),
}).required();

export const updateRecurringSchema = Joi.object({
  id: Joi.string().required(),
  amount: Joi.number().min(0),
  type: Joi.string().valid("income", "expense"),
  category: Joi.string(),
  frequency: Joi.string().valid("daily", "weekly", "monthly"),
  nextDate: Joi.date(),
  description: Joi.string().max(200).allow(""),
  active: Joi.boolean(),
}).required();
