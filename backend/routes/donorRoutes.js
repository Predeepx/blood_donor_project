import express from "express";
import {
  registerDonor,
  findDonors,
  sendSMS,
  toggleAvailability,
} from "../controllers/donorController.js";

import protect from "../middleware/authMiddleware.js";
const router = express.Router();

router.post("/register", protect, registerDonor);
router.post("/search", findDonors);
router.post("/sms", protect, sendSMS);
router.post("/toggle", protect, toggleAvailability);

export default router;
