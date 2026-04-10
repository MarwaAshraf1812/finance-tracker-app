import joi from "joi";

export const createCategorySchema = joi
  .object({
    type: joi
      .string()
      .valid(
        "living expenses",
        "food",
        "transportation",
        "shopping",
        "entertainment",
        "health",
        "education",
        "other",
      )
      .required(),
    icon: joi.string().optional(),
    color: joi.string().optional(),
  })
  .required();

export const getOrDeleteCategorySchema = joi
  .object({
    id: joi.string().hex().length(24).required(),
  })
  .unknown(true);

export const updateCategorySchema = joi
  .object({
    id: joi.string().hex().length(24).required(),
    type: joi
      .string()
      .valid(
        "living expenses",
        "food",
        "transportation",
        "shopping",
        "entertainment",
        "health",
        "education",
        "other",
      )
      .optional(),
    icon: joi.string().optional(),
    color: joi.string().optional(),
  })
  .unknown(true);
