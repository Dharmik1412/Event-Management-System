import express from "express";

import {
  createRequest,
  getRequests,
  getMyRequests,
  updateRequestStatus,
  sendQuotation,
  approveQuotation,
  rejectQuotation,
  getAdminStats
} from "../controllers/requestController.js";

import { protect, adminOnly } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, createRequest);

router.get("/my", protect, getMyRequests);

router.put("/:id/approve", protect, approveQuotation);

router.put("/:id/reject", protect, rejectQuotation);


router.get("/", protect, adminOnly, getRequests);

router.put("/:id", protect, adminOnly, updateRequestStatus);

router.put("/:id/quotation", protect, adminOnly, sendQuotation);

router.get("/admin/stats", protect, getAdminStats);

export default router;