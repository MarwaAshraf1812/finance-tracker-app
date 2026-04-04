import cron from "node-cron";
import { processRecurringTransactions } from "../services/recurringTransaction.processor.js";
import logger from "../logger/logger.service.js";
export const startRecurringJob = () => {
  logger.info("Schedule recurring job");
  // Run every day at 00:00 (midnight)
  cron.schedule("0 0 * * *", async () => {
    await processRecurringTransactions();
  });
};
