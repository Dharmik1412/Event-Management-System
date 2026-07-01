import express from "express";

import {
  getVenues,
  createVenue,
  updateVenue,
  deleteVenue,
} from "../controllers/venueController.js";

import { protect, adminOnly } from "../middleware/authMiddleware.js";

const router = express.Router();

//
// PUBLIC
//

// Get all venues
router.get("/", getVenues);

//
// ADMIN
//

// Create venue
router.post("/", protect, adminOnly, createVenue);

// Update venue
router.put("/:id", protect, adminOnly, updateVenue);

// Delete venue
router.delete("/:id", protect, adminOnly, deleteVenue);

export default router;