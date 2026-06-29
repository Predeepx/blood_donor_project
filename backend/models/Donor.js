import mongoose from "mongoose";

const donorSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true, // one donor per user
    },

    name: {
      type: String,
      required: true,
    },

    bloodGroup: {
      type: String,
      required: true,
      enum: ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"],
    },

    phone: {
      type: String,
      required: true,
    },

    city: String,

    available: {
      type: Boolean,
      default: true,
    },

    lastDonationDate: {
      type: Date,
      default: null,
    },

    location: {
      type: {
        type: String,
        enum: ["Point"],
        default: "Point",
      },
      coordinates: {
        type: [Number], // [longitude, latitude]
        required: true,
      },
    },
  },
  { timestamps: true },
);

/* ======================
   INDEXES (Performance)
====================== */
donorSchema.index({ location: "2dsphere" });
donorSchema.index({ bloodGroup: 1 });
donorSchema.index({ available: 1 });

export default mongoose.model("Donor", donorSchema);
