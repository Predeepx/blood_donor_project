const onlineUsers = new Map();

export const initializeSocket =
(io) => {
  io.on(
    "connection",
    (socket) => {
      console.log(
        "User connected:",
        socket.id
      );

      socket.on(
        "register",
        (userId) => {
          onlineUsers.set(
            userId,
            socket.id
          );
        }
      );

      socket.on(
        "disconnect",
        () => {
          for (
            const [
              userId,
              socketId,
            ] of onlineUsers
          ) {
            if (
              socketId ===
              socket.id
            ) {
              onlineUsers.delete(
                userId
              );
            }
          }
        }
      );
    }
  );
};

export const notifyUser = (
  io,
  userId,
  notification
) => {
  const socketId =
    onlineUsers.get(userId);

  if (socketId) {
    io.to(socketId).emit(
      "notification",
      notification
    );
  }
};