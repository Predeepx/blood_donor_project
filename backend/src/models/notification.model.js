import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema(
  {
    recipient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    title: {
      type: String,
      required: true,
    },

    message: {
      type: String,
      required: true,
    },

    type: {
      type: String,
      enum: [
        "BLOOD_REQUEST",
        "DONATION_CONFIRMED",
        "SYSTEM"
      ],
      default: "SYSTEM",
    },

    read: {
      type: Boolean,
      default: false,
    },

    metadata: {
      requestId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Request",
      },
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model(
  "Notification",
  notificationSchema
);