import API from "./axios";

export const createDonor = (data) => {
  return API.post("/donors", data);
};

export const getDonors = () => {
  return API.get("/donors");
};

export const searchDonors = (data) => {
  return API.post("/donors/search", data);
};