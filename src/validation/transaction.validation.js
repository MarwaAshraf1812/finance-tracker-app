import joi from "joi";

export const createTransactionSchema = joi.object({
    type: joi.string().valid("income", "expense").required(),
    amount: joi.number().positive().required(),
    category: joi.string().hex().length(24).optional(),
    description: joi.string().optional(),
    date: joi.date().optional(),
    isRecurring: joi.boolean().optional(),
}).required();

export const deleteOrGetTransactionSchema = joi.object({
    id: joi.string().hex().length(24).required(),
}).unknown(true); // Allow query parameters (like sort, filter) if any, but specifically validate ID in params.

export const updateTransactionSchema = joi.object({
    id: joi.string().hex().length(24).required(),
    type: joi.string().valid("income", "expense").optional(),
    amount: joi.number().positive().optional(),
    category: joi.string().hex().length(24).optional(),
    description: joi.string().optional(),
    date: joi.date().optional(),
    isRecurring: joi.boolean().optional(),
}).unknown(true);
