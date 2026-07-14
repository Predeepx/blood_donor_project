import { createContext, useEffect } from "react";
import { io } from "socket.io-client";

export const SocketContext = createContext();

const SOCKET_URL =
  import.meta.env.VITE_API_URL?.replace("/api", "") ||
  "https://quick-donor-project.onrender.com";

const socket = io(SOCKET_URL, {
  transports: ["websocket"],
  withCredentials: true,
});

export const SocketProvider = ({ children }) => {
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (user?._id) {
      socket.emit("register", user._id);
    }

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};
