import Donor from "../models/donor.model.js";

export const createDonor = async (data, userId) => {
  const donor = await Donor.create({
    ...data,
    user: userId,
  });

  return donor;
};

export const getAllDonors = async () => {
  return await Donor.find().populate("user", "name email profileImage");
};

export const getNearbyDonors = async (
  latitude,
  longitude,
  bloodGroup,
  radius = 100000,
) => {
  return await Donor.find({
    bloodGroup,
    available: true,

    location: {
      $near: {
        $geometry: {
          type: "Point",
          coordinates: [longitude, latitude],
        },

        $maxDistance: radius,
      },
    },
  }).populate("user", "name email profileImage");
};
