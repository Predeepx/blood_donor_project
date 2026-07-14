import API from "./axios";

export const createRequest = (data) => {
  return API.post("/api/request", data);
};

export const getRequests = () => {
  return API.get("/api/request");
};

export const updateRequestStatus = (requestId, status) => {
  return API.patch(`/api/request/${requestId}/status`, {
    status,
  });
};

export const deleteRequest = (requestId) => {
  return API.delete(`/api/request/${requestId}`);
};
