// src/routes/userRoutes.js
import express from "express";
import { getAllNasabah, approveUser } from "../controllers/userController.js";
import { protect, requireRole } from "../middleware/authMiddleware.js";
import { db } from "../config/firebase.js";

const router = express.Router();

/**
 * @route   GET /api/users/nasabah
 * @desc    Ambil semua nasabah
 * @access  Admin, Petugas
 */
router.get(
  "/nasabah",
  protect,
  requireRole(["admin", "petugas"]),
  getAllNasabah
);

/**
 * @route   PUT /api/users/approve/:userId
 * @desc    Approve user
 * @access  Admin, Petugas
 */
router.put(
  "/approve/:userId",
  protect,
  requireRole(["admin", "petugas"]),
  approveUser
);

/**
 * @route   GET /api/users/me
 * @desc    Ambil data user login sekarang
 * @access  Nasabah
 */
router.get("/me", protect, requireRole(["nasabah"]), async (req, res) => {
  try {
    const userRef = db.collection("users").doc(req.user.uid);
    const userDoc = await userRef.get();

    if (!userDoc.exists) {
      return res.status(404).json({ message: "User tidak ditemukan" });
    }

    return res.json({ uid: req.user.uid, ...userDoc.data() });
  } catch (error) {
    console.error("❌ Error getCurrentUser:", error.message);
    return res.status(500).json({ message: "Gagal ambil data user" });
  }
});

export default router;
