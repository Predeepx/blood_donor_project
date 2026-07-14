import API from "./axios";

export const createRequest = (data) => {
  return API.post("/request", data);
};

export const getRequests = () => {
  return API.get("/request");
};

export const updateRequestStatus = (requestId, status) => {
  return API.patch(`/request/${requestId}/status`, {
    status,
  });
};

export const deleteRequest = (requestId) => {
  return API.delete(`/request/${requestId}`);
};