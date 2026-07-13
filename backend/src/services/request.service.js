import Request from "../models/request.model.js";

export const createRequest = async (
  data,
  userId
) => {
  return await Request.create({
    ...data,
    requester: userId,
  });
};

export const getAllRequests = async () => {
  return await Request.find()
    .populate(
      "requester",
      "name email phone"
    )
    .sort({
      createdAt: -1,
    });
};

export const getRequestById = async (
  requestId
) => {
  return await Request.findById(
    requestId
  ).populate(
    "requester",
    "name email phone"
  );
};

export const updateRequestStatus =
  async (
    requestId,
    status
  ) => {
    return await Request.findByIdAndUpdate(
      requestId,
      { status },
      {
        new: true,
      }
    );
  };

export const deleteRequest =
  async (requestId) => {
    return await Request.findByIdAndDelete(
      requestId
    );
  };