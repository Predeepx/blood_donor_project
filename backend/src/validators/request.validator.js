const onlineUsers = new Map();

/**
 * Initialize all socket events
 */
export const initializeSocket = (io) => {
  io.on("connection", (socket) => {
    console.log(`🔌 User connected: ${socket.id}`);

    // Register authenticated user with socket
    socket.on("register", (userId) => {
      if (!userId) return;

      onlineUsers.set(userId.toString(), socket.id);

      console.log(`✅ User ${userId} registered with socket ${socket.id}`);

      console.log(`👥 Online users: ${onlineUsers.size}`);
    });

    // Optional heartbeat
    socket.on("ping", () => {
      socket.emit("pong");
    });

    // Cleanup on disconnect
    socket.on("disconnect", (reason) => {
      console.log(`❌ Socket disconnected: ${socket.id} (${reason})`);

      for (const [userId, socketId] of onlineUsers.entries()) {
        if (socketId === socket.id) {
          onlineUsers.delete(userId);

          console.log(`🗑️ Removed user ${userId} from online users`);

          break;
        }
      }

      console.log(`👥 Online users: ${onlineUsers.size}`);
    });

    // Handle unexpected errors
    socket.on("error", (error) => {
      console.error(`Socket error (${socket.id}):`, error);
    });
  });
};

/**
 * Send notification to a specific user
 */
export const notifyUser = (io, userId, notification) => {
  const socketId = onlineUsers.get(userId.toString());

  if (socketId) {
    io.to(socketId).emit("notification", notification);

    console.log(`📨 Notification sent to user ${userId}`);

    return true;
  }

  console.log(`⚠️ User ${userId} is offline`);

  return false;
};

/**
 * Check if user is online
 */
export const isUserOnline = (userId) => {
  return onlineUsers.has(userId.toString());
};

/**
 * Get socket id of a user
 */
export const getUserSocketId = (userId) => {
  return onlineUsers.get(userId.toString());
};

/**
 * Get all online users count
 */
export const getOnlineUsersCount = () => {
  return onlineUsers.size;
};
