import api from "./axios";

export const createDonor = (data) => {
  return api.post("/donors", data);
};

export const getDonors = () => {
  return api.get("/donors");
};

export const searchDonors = (data) => {
  return api.post("/donors/search", data);
};
