import express from "express";

import {
  getDecorations,
  createDecoration,
  updateDecoration,
  deleteDecoration,
} from "../controllers/decorController.js";

import {
  protect,
  adminOnly,
} from "../middleware/authMiddleware.js";

const router = express.Router();

// PUBLIC
router.get("/", getDecorations);

// ADMIN
router.post("/", protect, adminOnly, createDecoration);

router.put("/:id", protect, adminOnly, updateDecoration);

router.delete("/:id", protect, adminOnly, deleteDecoration);

export default router;