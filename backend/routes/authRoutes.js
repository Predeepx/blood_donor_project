import express from "express";
import { register, login } from "../controllers/authController.js";
import protect from "../middleware/authMiddleware.js";
import User from "../models/User.js";

const router = express.Router();

/* ===========================
   REGISTER
=========================== */
router.post("/register", register);

/* ===========================
   LOGIN
=========================== */
router.post("/login", login);

/* ===========================
   PROFILE (Protected)
=========================== */
router.get("/profile", protect, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});
router.put("/profile", protect, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user) return res.status(404).json({ message: "User not found" });

    user.name = req.body.name || user.name;
    user.phone = req.body.phone || user.phone;
    user.city = req.body.city || user.city;
    user.bloodGroup = req.body.bloodGroup || user.bloodGroup;

    await user.save();

    res.json(user);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

export default router;