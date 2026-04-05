import { createError } from "../utils/error.js";

export const authorize = (roles = []) => {
  if (typeof roles === 'string') {
    roles = [roles];
  }
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      const error = createError(403, "Forbidden");
      return next(error);
    }
    next();
  }
};