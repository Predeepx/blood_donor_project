import dotenv from "dotenv";
dotenv.config(); // MUST be first

import express from "express";
import cors from "cors";
import http from "http";
import { Server } from "socket.io";
import connectDB from "./config/db.js";

import authRoutes from "./routes/authRoutes.js";
import donorRoutes from "./routes/donorRoutes.js";
import requestRoutes from "./routes/requestRoutes.js";
console.log(process.env.MONGO_URI);
connectDB();

const app = express();
const server = http.createServer(app);

/* ===============================
   SOCKET.IO
================================= */
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:5174",
  "https://your-app.vercel.app",
];

const io = new Server(server, {
  cors: {
    origin: allowedOrigins,
    methods: ["GET", "POST"],
  },
});
app.set("io", io);

io.on("connection", (socket) => {
  console.log("🟢 User connected:", socket.id);
  socket.on("disconnect", () => {
    console.log("🔴 User disconnected:", socket.id);
  });
});

/* ===============================
   MIDDLEWARE
================================= */
app.use(
  cors({
    origin: allowedOrigins,
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

app.get("/", (req, res) => {
  res.send("🚀 QuickDonor API is running...");
});

/* ===============================
   START SERVER
================================= */
const PORT = process.env.PORT || 5001;

server.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
