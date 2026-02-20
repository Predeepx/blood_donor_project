import mongoose from "mongoose";

const requestSchema = new mongoose.Schema({
  bloodGroup: String,
  location: {
    type: {
      type: String,
      default: "Point",
    },
    coordinates: [Number],
  },
});

export default mongoose.model("Request", requestSchema);
