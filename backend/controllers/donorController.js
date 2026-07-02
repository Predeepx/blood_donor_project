

import Donor from "../models/Donor.js";
import twilio from "twilio";

const client = twilio(
  process.env.TWILIO_SID,
  process.env.TWILIO_AUTH
);


/* ===============================
   REGISTER DONOR
================================= */
export const registerDonor = async (req, res) => {
  
  try {
    const { name, bloodGroup, phone, city, longitude, latitude } = req.body;

    // 🔒 Basic validation
    if (!name || !bloodGroup || !phone || !city) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (!longitude || !latitude) {
      return res.status(400).json({ message: "Location required" });
    }

    const validGroups = ["A+","A-","B+","B-","O+","O-","AB+","AB-"];

    if (!validGroups.includes(bloodGroup)) {
      return res.status(400).json({ message: "Invalid blood group" });
    }

    // 🔥 Prevent duplicate donor profile
    const existingDonor = await Donor.findOne({ user: req.user.id });
    if (existingDonor) {
      return res.status(400).json({
        message: "You are already registered as a donor",
      });
    }

    const donor = await Donor.create({
      user: req.user.id,
      name,
      bloodGroup,
      phone,
      city,
      location: {
        type: "Point",
        coordinates: [longitude, latitude],
      },
    });

    const io = req.app.get("io");
    if (io) io.emit("newDonor", donor);

    res.status(201).json(donor);
  } catch (error) {
    console.error("Register Donor Error:", error);
    res.status(500).json({ message: "Server error" });
    
  }
};

/* ===============================
   FIND DONORS (GLOBAL + NEARBY)
================================= */

export const findDonors = async (req, res) => {
  try {
    const { bloodGroup, latitude, longitude, nearbyOnly } = req.body;

    let query = {
      available: true,
    };

    if (bloodGroup) {
      query.bloodGroup = bloodGroup;
    }

    // 90-day cooldown
    const ninetyDaysAgo = new Date();
    ninetyDaysAgo.setDate(ninetyDaysAgo.getDate() - 90);

    query.$or = [
      { lastDonationDate: null },
      { lastDonationDate: { $lte: ninetyDaysAgo } },
    ];

    if (nearbyOnly && latitude && longitude) {
      query.location = {
        $near: {
          $geometry: {
            type: "Point",
            coordinates: [longitude, latitude],
          },
          $maxDistance: 10000, // 10km
        },
      };
    }

    // ⚡ Performance optimized
    const donors = await Donor.find(query).lean();

    res.json(donors);
  } catch (error) {
    console.error("Search Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

/* ===============================
   TOGGLE AVAILABILITY
================================= */
export const toggleAvailability = async (req, res) => {
  try {
    const { donorId } = req.body;

    const donor = await Donor.findById(donorId);

    if (!donor) {
      return res.status(404).json({ message: "Donor not found" });
    }

    // 🔒 Prevent toggle during cooldown
    if (donor.lastDonationDate) {
      const diff = Date.now() - donor.lastDonationDate.getTime();
      const days = diff / (1000 * 60 * 60 * 24);

      if (days < 90) {
        return res.status(400).json({
          message: `You can donate again in ${Math.ceil(90 - days)} days`,
        });
      }
    }

    donor.available = !donor.available;
    await donor.save();

    res.json({ message: "Availability updated", available: donor.available });
  } catch (error) {
    console.error("Toggle Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

/* ===============================
   SEND PROFESSIONAL SMS
================================= */
export const sendSMS = async (req, res) => {
  try {
    const { donorId, hospitalName, requiredTime, finderLocation } = req.body;

    const donor = await Donor.findById(donorId);

    if (!donor) {
      return res.status(404).json({ message: "Donor not found" });
    }

    const messageBody = `
🚨 EMERGENCY BLOOD REQUEST 🚨

Blood Group Needed: ${donor.bloodGroup}
Hospital: ${hospitalName}
Time Required: ${requiredTime}

Location:
https://www.google.com/maps?q=${finderLocation.lat},${finderLocation.lng}

Please respond if available.

QuickDonor 🩸
`;

    await client.messages.create({
      body: messageBody,
      from: process.env.TWILIO_PHONE,
      to: donor.phone,
    });

    res.json({ message: "SMS sent successfully" });
  } catch (error) {
    console.error("SMS Error:", error);
    res.status(500).json({ message: "Failed to send SMS" });
  }
};