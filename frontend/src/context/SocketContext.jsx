import {
  createContext,
  useEffect,
} from "react";

import { io } from
"socket.io-client";

export const SocketContext =
createContext();

const socket = io(
  import.meta.env.VITE_API_URL
);

export const SocketProvider =
({ children }) => {

  useEffect(() => {
    const user =
      JSON.parse(
        localStorage.getItem(
          "user"
        )
      );

    if (user) {
      socket.emit(
        "register",
        user.id
      );
    }
  }, []);

  return (
    <SocketContext.Provider
      value={socket}
    >
      {children}
    </SocketContext.Provider>
  );
};