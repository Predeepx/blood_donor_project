import API from "./axios";

export const createDonor = (data) => API.post("/donors", data);

export const getDonors = () => API.get("/donors");

export const searchDonors = (data) => API.post("/donors/search", data);
