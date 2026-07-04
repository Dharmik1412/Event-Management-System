import mongoose from "mongoose";

const contactSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String },
    eventType: { type: String },
    queryType: { type: String },
    message: { type: String, required: true },
    replyMessage: String,
    // "email" | "phone"
    replyMethod: String, 
    status: { type: String, default: "New" }
  },
  { timestamps: true }
);

export default mongoose.model("Contact", contactSchema);