import joi from "joi";

export const getUserByIdSchema = joi.object({
  id: joi.string().hex().length(24).required(),
}).required();