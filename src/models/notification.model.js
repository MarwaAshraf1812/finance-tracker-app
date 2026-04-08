import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User is required"],
      index: true,
    },

    title: {
      type: String,
      enum: {
        values: ["budget_alert", "expense_added", "income_added"],
        message:
          "Title must be either budget_alert, expense_added, or income_added",
      },
      required: [true, "Title is required"],
    },

    message: {
      type: String,
      required: [true, "Message is required"],
      trim: true,
    },

    isRead: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model("Notification", notificationSchema);
