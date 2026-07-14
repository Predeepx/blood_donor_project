import API from "./axios";

export const createRequest = (data) => API.post("/request", data);

export const getRequests = () => API.get("/request");

export const updateRequestStatus = (requestId, status) =>
  API.patch(`/request/${requestId}/status`, { status });

export const deleteRequest = (requestId) => API.delete(`/request/${requestId}`);
