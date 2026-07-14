import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import http from "http";
import { Server } from "socket.io";

import connectDB from "./config/db.js";

import authRoutes from "./routes/auth.routes.js";
import donorRoutes from "./routes/donor.routes.js";
import requestRoutes from "./routes/request.routes.js";
import dashboardRoutes from "./routes/dashboard.routes.js";
import notificationRoutes from "./routes/notification.routes.js";

import errorMiddleware from "./middleware/error.middleware.js";
import { initializeSocket } from "./sockets/socket.handlers.js";

/* ===============================
   DATABASE
================================= */
connectDB();

/* ===============================
   EXPRESS APP
================================= */
const app = express();
const server = http.createServer(app);

/* ===============================
   CORS ORIGINS
================================= */
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:5174",
  "https://blood-donor-project-six.vercel.app",
];

/* ===============================
   SOCKET.IO
================================= */
const io = new Server(server, {
  cors: {
    origin: true,
    methods: ["GET", "POST"],
    credentials: true,
  },
});

initializeSocket(io);

app.set("io", io);

/* ===============================
   MIDDLEWARE
================================= */
app.use(
  cors({
    origin: true,
    credentials: true,
  }),
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* ===============================
   ROUTES
================================= */
app.use("/api/auth", authRoutes);
app.use("/api/donors", donorRoutes);
app.use("/api/request", requestRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/notifications", notificationRoutes);

/* ===============================
   HEALTH CHECK
================================= */
app.get("/", (req, res) => {
  res.json({
    message: "QuickDonor API is running 🚀",
  });
});

app.post("/test", (req, res) => {
  res.json({
    message: "POST works",
  });
});

/* ===============================
   ERROR HANDLER
================================= */
app.use(errorMiddleware);

/* ===============================
   START SERVER
================================= */
const PORT = process.env.PORT || 5001;

server.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
