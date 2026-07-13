import api from "./axios";

export const createDonor = (data) => api.post("/donors", data);

export const getDonors = () => api.get("/donors");

export const searchDonors = (data) => api.post("/donors/search", data);
