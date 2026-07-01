import mongoose from "mongoose";

const contactSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String },
    eventType: { type: String },
    queryType: { type: String },
    message: { type: String, required: true },
    status: {
      type: String,
      default: "New",
      enum: ["New", "In Progress", "Resolved"],
    },
    replyMessage: String,
    replyMethod: String, // "email" | "phone"
    status: { type: String, default: "New" }
  },
  { timestamps: true }
);

export default mongoose.model("Contact", contactSchema);