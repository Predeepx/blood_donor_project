import Donor from "../models/Donor.js";
import twilio from "twilio";

console.log("TWILIO_SID:", process.env.TWILIO_SID);
console.log("TWILIO_AUTH:", process.env.TWILIO_AUTH);


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

    if (!longitude || !latitude) {
      return res.status(400).json({ message: "Location required" });
    }

    const donor = await Donor.create({
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

    // 90 DAY COOLDOWN LOGIC
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

    const donors = await Donor.find(query);

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

    res.json({ message: "SMS sent successfully 📩" });
  } catch (error) {
    console.error("SMS Error:", error);
    res.status(500).json({ message: "Failed to send SMS" });
  }
};
