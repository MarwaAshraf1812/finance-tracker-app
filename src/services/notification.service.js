import Notification from "../models/notification.model.js";

export const createNotification = async (data) => {
  return await Notification.create(data);
};

export const getUserNotifications = async (userId) => {
  return await Notification.find({ user: userId }).sort({ createdAt: -1 });
};

export const markAsRead = async (notificationId, userId) => {
  return await Notification.findOneAndUpdate(
    { _id: notificationId, user: userId },
    { isRead: true },
    { new: true },
  );
};

export const deleteNotification = async (notificationId, userId) => {
  return await Notification.findOneAndDelete({
    _id: notificationId,
    user: userId,
  });
};
