import mongoose from "mongoose";

const decorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  city: {
    type: String,
    required: true,
  },

  level: {
    type: String,
    enum: ["basic", "premium", "luxury"],
    required: true,
  },

  price: {
    type: Number,
    required: true,
  },

  cover: {
    type: String,
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
}, { timestamps: true });

export default mongoose.model("Decoration", decorSchema);