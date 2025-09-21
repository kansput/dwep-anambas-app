// src/routes/transactionRoutes.js
import express from "express";
import {
  setorSampah,
  getNasabahTransactions,
  getBankTransactions,
} from "../controllers/transactionController.js";
import { protect } from "../middleware/authMiddleware.js";
import { authorizeRoles } from "../middleware/roleMiddleware.js";

const router = express.Router();

// 🔹 Petugas/Admin input setor
router.post("/setor", protect, authorizeRoles("admin", "petugas"), setorSampah);

// 🔹 Nasabah lihat riwayatnya sendiri
router.get(
  "/nasabah/:id",
  protect,
  authorizeRoles("nasabah"),
  getNasabahTransactions
);

// 🔹 Petugas/Admin lihat transaksi 1 bank sampah
router.get(
  "/bank/:name",
  protect,
  authorizeRoles("admin", "petugas"),
  getBankTransactions
);

export default router;
