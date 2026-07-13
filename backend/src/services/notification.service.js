import Notification from "../models/notification.model.js";

export const createNotification = async (
  recipient,
  title,
  message,
  type = "SYSTEM",
  metadata = {}
) => {
  return await Notification.create({
    recipient,
    title,
    message,
    type,
    metadata,
  });
};

export const getUserNotifications =
async (userId) => {
  return await Notification.find({
    recipient: userId,
  }).sort({
    createdAt: -1,
  });
};

export const markAsRead = async (
  notificationId
) => {
  return await Notification.findByIdAndUpdate(
    notificationId,
    {
      read: true,
    },
    {
      new: true,
    }
  );
};