// import dotenv from "dotenv";
// dotenv.config(); // MUST BE FIRST LINE


import express from "express";
import cors from "cors";
import http from "http";
import { Server } from "socket.io";
import connectDB from "./config/db.js";

// Routes
import authRoutes from "./routes/authRoutes.js";
import donorRoutes from "./routes/donorRoutes.js";
import requestRoutes from "./routes/requestRoutes.js";

// Connect to MongoDB
connectDB();

const app = express();

/* ===============================
   CREATE HTTP SERVER + SOCKET.IO
================================= */
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5174",
    methods: ["GET", "POST"],
  },
});

app.set("io", io);

/* ===============================
   SOCKET CONNECTION
================================= */
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
    origin: "http://localhost:5174",
    credentials: true,
  })
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
  console.log(`
  =====================================
   🚀 QuickDonor Server Running
   🌍 Port: ${PORT}
   📡 Mode: ${process.env.NODE_ENV || "development"}
  =====================================
  `);
});
