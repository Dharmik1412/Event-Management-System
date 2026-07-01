import express from "express";
import {
  createContact,
  getContacts,
  updateContactStatus,
} from "../controllers/contactController.js";

import { protect, adminOnly } from "../middleware/authMiddleware.js";

const router = express.Router();

// public
router.post("/", createContact);

// admin
router.get("/", protect, adminOnly, getContacts);
router.put("/:id", protect, adminOnly, updateContactStatus);

export default router;