import express from "express";
import dotenv from "dotenv";
import cors from "cors";

// ✅ Load environment FIRST
dotenv.config();

// ✅ DB connect AFTER env is loaded
import connectDB from "./config/db.js";

// Routes
import authRoutes from "./routes/authRoutes.js";
import requestRoutes from "./routes/requestRoutes.js";
import venueRoutes from "./routes/venueRoutes.js";
import decorationRoutes from "./routes/decorationRoutes.js";
import cateringsRoutes from "./routes/cateringsRoutes.js";
import contactRoutes from "./routes/contactRoutes.js";

// Connect Database
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api", requestRoutes);
app.use("/api/venues", venueRoutes);
app.use("/api/decorations", decorationRoutes);
app.use("/api/catering", cateringsRoutes);
app.use("/api/contact", contactRoutes);

// Health check route
app.get("/", (req, res) => {
  res.send("🚀 Event Management API Running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});