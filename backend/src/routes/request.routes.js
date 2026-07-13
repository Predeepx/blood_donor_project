import express from "express";

import authMiddleware from "../middleware/authMiddleware.js";

import {
  createRequest,
  getAllRequests,
  updateStatus,
  deleteRequest,
} from "../controllers/request.controller.js";

const router = express.Router();

router.post("/", authMiddleware, createRequest);

router.get("/", getAllRequests);

router.patch("/:id/status", authMiddleware, updateStatus);

router.delete("/:id", authMiddleware, deleteRequest);

export default router;
