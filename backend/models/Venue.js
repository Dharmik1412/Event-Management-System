import mongoose from "mongoose";

const venueSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  city: {
    type: String,
    required: true,
  },

  cover: {
    type: String,
    required: true,
  },

  // Base venue price (used in quotation calculation)
  price: {
    type: Number,
    required: true,
  },

  decorLevel: {
    type: String,
    enum: ["basic", "premium", "luxury"],
    required: true,
  },

  subCards: [
    {
      name: {
        type: String,
        required: true,
      },

      image: {
        type: String,
        required: true,
      },
    },
  ],
});

export default mongoose.model("Venue", venueSchema);

