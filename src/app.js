import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import connectDB from "./config/dbConfig.js";
import { errorHandler } from "./middlewares/error.middleware.js";
import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";
import categoriesRouter from "./routes/category.routes.js";
import transactionsRouter from "./routes/transaction.routes.js";
import budgetsRouter from "./routes/budget.routes.js";
import { globalLimiter } from "./middlewares/rateLimit.middleware.js";

const app = express();

connectDB();

app.use(
  cors({
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

app.use(helmet());

// global rate limiter
app.use(globalLimiter);

// log http requests
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/auth", authRoutes);
app.use("/user", userRoutes);
app.use("/api/v1/categories", categoriesRouter);
app.use("/api/v1/transactions", transactionsRouter);
app.use("/api/v1/budgets", budgetsRouter);

app.use((req, res, next) => {
  res.status(404).json({ success: false, message: "Route not found" });
});

app.use(errorHandler);

export default app;
