import Donor from "../models/donor.model.js";
import Request from "../models/request.model.js";

export const getDashboardStats = async (req, res) => {
  try {
    const totalDonors = await Donor.countDocuments();

    const availableDonors = await Donor.countDocuments({
      available: true,
    });

    const activeRequests = await Request.countDocuments({
      status: "OPEN",
    });

    const completedRequests = await Request.countDocuments({
      status: "FULFILLED",
    });

    const bloodGroupStats = await Donor.aggregate([
      {
        $group: {
          _id: "$bloodGroup",
          count: { $sum: 1 },
        },
      },
      {
        $sort: {
          count: -1,
        },
      },
    ]);

    res.json({
      totalDonors,
      availableDonors,
      activeRequests,
      completedRequests,
      bloodGroupStats,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};