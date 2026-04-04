export const calculateNextDate = (date, frequency) => {
  const next = new Date(date);

  if (frequency === "daily") next.setDate(next.getDate() + 1);
  if (frequency === "weekly") next.setDate(next.getDate() + 7);
  if (frequency === "monthly") next.setMonth(next.getMonth() + 1);

  return next;
};
