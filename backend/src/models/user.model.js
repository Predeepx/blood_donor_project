import mongoose from "mongoose";

const donationSchema = new mongoose.Schema(
  {
    date: {
      type: Date,
      default: Date.now,
    },
    hospital: String,
    location: String,
  },
  {
    _id: false,
  },
);

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 50,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
      minlength: 6,
      select: false,
    },

    bloodGroup: {
      type: String,
      enum: ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"],
    },

    phone: String,

    city: String,

    profileImage: {
      type: String,
      default: "",
    },

    donationHistory: [donationSchema],
  },
  {
    timestamps: true,
  },
);

export default mongoose.model("User", userSchema);
