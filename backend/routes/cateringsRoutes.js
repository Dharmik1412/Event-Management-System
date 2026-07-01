import express from "express";
import {
  getCatering,
  getSingleCatering,
  createCatering,
  updateCatering,
  deleteCatering,
  updateMenu,
} from "../controllers/cateringController.js";

import {
  protect,
  adminOnly,
} from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", getCatering);

router.get("/:id", getSingleCatering);

router.post("/", protect, adminOnly, createCatering);

router.put("/:id", protect, adminOnly, updateCatering);

router.delete("/:id", protect, adminOnly, deleteCatering);

router.put("/:id/menu", protect, adminOnly, updateMenu);

export default router;