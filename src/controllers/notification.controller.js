import * as notificationService from "../services/notification.service.js";
import { createError } from "../utils/error.js";

export const getNotifications = async (req, res, next) => {
  const notifications = await notificationService.getUserNotifications(
    req.user.id,
  );

  res.json({
    success: true,
    data: notifications,
  });
};

export const markNotificationAsRead = async (req, res, next) => {
  const notification = await notificationService.markAsRead(
    req.params.id,
    req.user.id,
  );

  if (!notification) {
    throw createError(404, "Notification not found");
  }

  res.json({
    success: true,
    data: notification,
  });
};

export const deleteNotification = async (req, res, next) => {
  const notification = await notificationService.deleteNotification(
    req.params.id,
    req.user.id,
  );

  if (!notification) {
    throw createError(404, "Notification not found");
  }

  res.json({
    success: true,
    data: notification,
  });
};
