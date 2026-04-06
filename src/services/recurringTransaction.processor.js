import RecurringTransaction from "../models/recurringTransaction.model.js";
import { calculateNextDate } from "../utils/calculateNextDate.js";

// placeholder until Transaction model finished
const Transaction = null;

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
        recurringId: r._id,
      });

      nextDate = calculateNextDate(nextDate, r.frequency);
    }

    r.nextDate = nextDate;
    r.lastProcessedDate = today;

    await r.save();
  }
};
