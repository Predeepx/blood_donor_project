import api from "./axios";

export const createRequest = (
  data
) => api.post(
  "/request",
  data
);

export const getRequests = () =>
  api.get("/request");

export const updateRequestStatus =
(id, status) =>
  api.patch(
    `/request/${id}/status`,
    { status }
  );

export const deleteRequest =
(id) =>
  api.delete(
    `/request/${id}`
  );