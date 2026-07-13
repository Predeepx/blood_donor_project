import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";

import {
  createDonor,
  getAllDonors,
  searchNearbyDonors,
} from "../controllers/donor.controller.js";

const router = express.Router();

router.post("/", authMiddleware, createDonor);

router.get("/", getAllDonors);

router.post("/search", searchNearbyDonors);

export default router;
