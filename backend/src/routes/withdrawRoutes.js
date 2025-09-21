// src/routes/withdrawRoutes.js
import express from "express";
import { requestWithdraw, getBankWithdraws, approveWithdraw } from "../controllers/withdrawController.js";
import { protect } from "../middleware/authMiddleware.js";
import { authorizeRoles } from "../middleware/roleMiddleware.js";

const router = express.Router();

// Nasabah ajukan withdraw
router.post("/", protect, authorizeRoles("Nasabah"), requestWithdraw);

// Petugas/Admin lihat withdraw di bank
router.get("/bank/:name", protect, authorizeRoles("Petugas", "Admin"), getBankWithdraws);

// Petugas/Admin approve/reject
router.put("/:id", protect, authorizeRoles("Petugas", "Admin"), approveWithdraw);

export default router;
