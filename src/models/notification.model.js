import mongoose from "mongoose";

/**
 * @swagger
 * components:
 *   schemas:
 *     Notification:
 *       type: object
 *       required:
 *         - user
 *         - title
 *         - message
 *       properties:
 *         _id:
 *           type: string
 *           example: "65f1c2a3"
 *         user:
 *           type: string
 *           example: "64a8c2b1"
 *         title:
 *           type: string
 *           enum: [budget_alert, expense_added, income_added]
 *           example: "budget_alert"
 *         message:
 *           type: string
 *           example: "You have exceeded your monthly budget for food."
 *         isRead:
 *           type: boolean
 *           default: false
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 *
 *     NotificationResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *         data:
 *           $ref: '#/components/schemas/Notification'
 *
 *     NotificationListResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *         count:
 *           type: number
 *         data:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Notification'
 */

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
