import mongoose from "mongoose";

const cateringSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  city: {
    type: String,
    required: true,
  },

  pricePerPlate: {
    type: Number,
    required: true,
  },

  cover: {
    type: String,
    required: true,
  },

  limits: {
    starters: {
      type: Number,
      default: 2,
    },

    mains: {
      type: Number,
      default: 3,
    },

    desserts: {
      type: Number,
      default: 2,
    },

    beverages: {
      type: Number,
      default: 2,
    },
  },

  menu: {
    starters: {
      type: [String],
      default: [],
    },

    mains: {
      type: [String],
      default: [],
    },

    desserts: {
      type: [String],
      default: [],
    },

    beverages: {
      type: [String],
      default: [],
    },
  },
});

export default mongoose.model("Catering", cateringSchema);