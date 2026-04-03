import express from "express";
import cors from 'cors';
import helmet from 'helmet';
import cookieParser from "cookie-parser";
import connectDB from "./config/dbConfig.js";

const app = express();

connectDB();

app.use(cors({
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(helmet());
app.use(express.json());
app.use(cookieParser());

export default app;