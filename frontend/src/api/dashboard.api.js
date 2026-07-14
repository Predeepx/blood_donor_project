import API from "./axios";

export const getDashboardStats = () => {
  return API.get("/api/dashboard");
};
