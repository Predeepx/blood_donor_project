import API from "./axios";

export const createDonor = (data) => {
  return API.post("/api/donors", data);
};

export const getDonors = () => {
  return API.get("/api/donors");
};

export const searchDonors = (data) => {
  return API.post("/api/donors/search", data);
};
