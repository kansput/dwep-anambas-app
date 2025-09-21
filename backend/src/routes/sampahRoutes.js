import express from "express";
import {
  getSampah,
  getSampahDetail,
  createSampah,
  updateSampah,
  deleteSampah,
} from "../controllers/sampahController.js";
import { protect as verifyToken, requireRole } from "../middleware/authMiddleware.js";

const router = express.Router();

// 🔹 Ambil semua sampah
router.get("/", verifyToken, getSampah);

// 🔹 Ambil detail sampah by ID
router.get("/:id", verifyToken, getSampahDetail);

// 🔹 Tambah sampah baru (khusus admin)
router.post("/", verifyToken, requireRole(["admin"]), createSampah);

// 🔹 Update sampah (khusus admin)
router.patch("/:id", verifyToken, requireRole(["admin"]), updateSampah);

// 🔹 Hapus sampah (khusus admin)
router.delete("/:id", verifyToken, requireRole(["admin"]), deleteSampah);

export default router;
