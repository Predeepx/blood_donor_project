import * as notificationService from
"../services/notification.service.js";

export const getNotifications =
async (req, res, next) => {
  try {
    const notifications =
      await notificationService
        .getUserNotifications(
          req.user.id
        );

    res.json(notifications);
  } catch (error) {
    next(error);
  }
};

export const readNotification =
async (req, res, next) => {
  try {
    const notification =
      await notificationService
        .markAsRead(
          req.params.id
        );

    res.json(notification);
  } catch (error) {
    next(error);
  }
};