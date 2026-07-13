import * as donorService from "../services/donor.service.js";

export const createDonor = async (
  req,
  res,
  next
) => {
  try {
    const donor =
      await donorService.createDonor(
        req.body,
        req.user.id
      );

    res.status(201).json(donor);
  } catch (error) {
    next(error);
  }
};

export const getAllDonors = async (
  req,
  res,
  next
) => {
  try {
    const donors =
      await donorService.getAllDonors();

    res.json(donors);
  } catch (error) {
    next(error);
  }
};

export const searchNearbyDonors = async (
  req,
  res,
  next
) => {
  try {
    const {
      latitude,
      longitude,
      bloodGroup,
    } = req.body;

    const donors =
      await donorService.getNearbyDonors(
        latitude,
        longitude,
        bloodGroup
      );

    res.json(donors);
  } catch (error) {
    next(error);
  }
};