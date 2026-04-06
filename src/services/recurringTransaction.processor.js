import RecurringTransaction from "../models/recurringTransaction.model.js";
import Transaction from "../models/transaction.model.js";
import { calculateNextDate } from "../utils/calculateNextDate.js";

export const processRecurringTransactions = async () => {
  const today = new Date();

  const recurring = await RecurringTransaction.find({
    active: true,
    nextDate: { $lte: today },
  });

  for (const r of recurring) {
    let nextDate = r.nextDate;

    while (nextDate <= today) {
      await Transaction.create({
        user: r.user,
        amount: r.amount,
        type: r.type,
        category: r.category,
        description: r.description,
        isRecurring: true,
      });

      nextDate = calculateNextDate(nextDate, r.frequency);
    }

    r.nextDate = nextDate;
    r.lastProcessedDate = today;

    await r.save();
  }
};
