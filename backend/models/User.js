import mongoose from "mongoose";

const donationSchema = new mongoose.Schema({
  date: { type: Date, default: Date.now },
  hospital: String,
  location: String,
});

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    bloodGroup: String,
    phone: String,
    city: String,
    profileImage: String,
    donationHistory: [donationSchema],
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);