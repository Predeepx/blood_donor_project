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
  "https://blood-donor-project-six.vercel.app",
];

const io = new Server(server, {
  cors: {
    origin: allowedOrigins,
    methods: ["GET", "POST"],
  },
});

app.set("io", io);

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
app.use("/api/dashboard", dashboardRoutes); // ✅ moved here

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
