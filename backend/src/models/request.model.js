import mongoose from "mongoose";

const requestSchema = new mongoose.Schema(
  {
    requester: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    bloodGroup: {
      type: String,
      required: true,
      enum: [
        "A+",
        "A-",
        "B+",
        "B-",
        "O+",
        "O-",
        "AB+",
        "AB-",
      ],
    },

    units: {
      type: Number,
      required: true,
      min: 1,
    },

    hospital: {
      type: String,
      required: true,
      trim: true,
    },

    city: {
      type: String,
      required: true,
    },

    notes: {
      type: String,
      default: "",
      maxlength: 500,
    },

    status: {
      type: String,
      enum: [
        "OPEN",
        "FULFILLED",
        "CANCELLED",
      ],
      default: "OPEN",
    },

    location: {
      type: {
        type: String,
        enum: ["Point"],
        default: "Point",
      },

      coordinates: {
        type: [Number],
        required: true,
      },
    },
  },
  {
    timestamps: true,
  }
);

requestSchema.index({
  location: "2dsphere",
});

export default mongoose.model(
  "Request",
  requestSchema
);