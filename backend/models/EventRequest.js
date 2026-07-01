import mongoose from "mongoose";

const eventRequestSchema = new mongoose.Schema(
  {
    customerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    eventType: {
      type: String,
      required: true,
    },

    city: {
      type: String,
      required: true,
    },

    eventDate: {
      type: Date,
      required: true,
    },

    guests: {
      type: Number,
      required: true,
    },

    venueStatus: {
      type: String,
      enum: ["needVenue", "haveVenue"],
      required: true,
    },

    // 🔥 Stores complete venue, decoration & catering selections
    eventDetails: {
      type: Object,
      default: {},
    },

    requirements: {
      type: String,
      default: "",
    },

    status: {
      type: String,
      enum: [
        "Pending",
        "Quoted",
        "Approved",
        "Rejected",
        "Completed",
      ],
      default: "Pending",
    },

    quotationAmount: {
      type: Number,
      default: 0,
    },

    quotationNotes: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("EventRequest", eventRequestSchema);