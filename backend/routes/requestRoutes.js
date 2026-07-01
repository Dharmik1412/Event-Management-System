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

//
// CUSTOMER ROUTES
//

// Create new event request
router.post("/", protect, createRequest);

// Customer can see only their own requests
router.get("/my", protect, getMyRequests);

// Customer approves quotation
router.put("/:id/approve", protect, approveQuotation);

// Customer rejects quotation
router.put("/:id/reject", protect, rejectQuotation);

//
// ADMIN ROUTES
//

// View all requests
router.get("/", protect, adminOnly, getRequests);

// Update request status
router.put("/:id", protect, adminOnly, updateRequestStatus);

// Send quotation
router.put("/:id/quotation", protect, adminOnly, sendQuotation);

router.get("/admin/stats", protect, getAdminStats);
export default router;