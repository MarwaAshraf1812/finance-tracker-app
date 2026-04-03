import 'dotenv/config';
import mongoose from "mongoose";

const DB_URL = process.env.DB_URL;

const connectDB = async () => {
  try {
    await mongoose.connect(DB_URL);
    console.log("Connected to MongoDB");
  } catch (err) {
    console.error("Failed to connect to MongoDB", err);
  }
};

export default connectDB;