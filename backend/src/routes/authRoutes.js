import express from "express";
import {
  registerUser,
  loginUser,
  loginWithGoogle,
  logoutUser,
  getPendingNasabah,
  approveNasabah,
  rejectNasabah,
} from "../controllers/authController.js";
import { protect, requireRole } from "../middleware/authMiddleware.js";

const router = express.Router();

// ============================
// 🔑 AUTH ROUTES (Publik)
// ============================

// Register
router.post("/register", registerUser);

// Login biasa
router.post("/login", loginUser);

// Login via Google
router.post("/google", loginWithGoogle);

// Logout
router.post("/logout", logoutUser);

// ============================
// 🛡️ ADMIN ONLY ROUTES
// ============================

// Daftar nasabah yang pending approval
router.get(
  "/admin/pending-nasabah",
  protect,
  requireRole(["admin"]),
  getPendingNasabah
);

// Approve nasabah
router.patch(
  "/admin/approve-nasabah/:id",
  protect,
  requireRole(["admin"]),
  approveNasabah
);

// Reject nasabah
router.delete(
  "/admin/reject-nasabah/:id",
  protect,
  requireRole(["admin"]),
  rejectNasabah
);

export default router;
