import cron from "node-cron";
import { processRecurringTransactions } from "../services/recurringTransaction.processor.js";
export const startRecurringJob = () => {
  // Run every day at 00:00 (midnight)
  cron.schedule("0 0 * * *", async () => {
    await processRecurringTransactions();
  });
};
