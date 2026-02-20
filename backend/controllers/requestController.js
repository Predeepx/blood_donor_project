import Donor from "../models/Donor.js";
import twilio from "twilio";

const client = twilio(
  process.env.TWILIO_SID,
  process.env.TWILIO_AUTH
);

export const createRequest = async (req, res) => {
  const { bloodGroup, longitude, latitude } = req.body;

  const nearbyDonors = await Donor.find({
    bloodGroup,
    location: {
      $near: {
        $geometry: {
          type: "Point",
          coordinates: [longitude, latitude],
        },
        $maxDistance: 10000, // 10km radius
      },
    },
  });

  for (let donor of nearbyDonors) {
    await client.messages.create({
      body: `🚨 Emergency! ${bloodGroup} blood needed nearby.`,
      from: process.env.TWILIO_PHONE,
      to: donor.phone,
    });
  }

  res.json({ message: "SMS sent to nearby donors" });
};
