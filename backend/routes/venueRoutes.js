import express from "express";

import {
  getVenues,
  createVenue,
  updateVenue,
  deleteVenue,
} from "../controllers/venueController.js";

import { protect, adminOnly } from "../middleware/authMiddleware.js";

const router = express.Router();


router.get("/", getVenues);


router.post("/", protect, adminOnly, createVenue);

router.put("/:id", protect, adminOnly, updateVenue);

router.delete("/:id", protect, adminOnly, deleteVenue);

export default router;