// src/routes/reportRoutes.js
import express from "express";
import {
  exportNasabahExcel,
  exportNasabahPDF,
  exportBankTransactionsExcel,
  exportBankTransactionsPDF,
  exportWithdrawExcel,
  exportWithdrawPDF,
  exportSalesExcel,
  exportSalesPDF,
} from "../controllers/reportController.js";

import { protect } from "../middleware/authMiddleware.js";
import { authorizeRoles } from "../middleware/roleMiddleware.js";

const router = express.Router();

// ✅ Nasabah export laporan bulanan
router.get("/nasabah/:id/excel", protect, authorizeRoles("Nasabah"), exportNasabahExcel);
router.get("/nasabah/:id/pdf", protect, authorizeRoles("Nasabah"), exportNasabahPDF);

// ✅ Petugas/Admin export transaksi bank (date range)
router.get("/bank/:name/excel", protect, authorizeRoles("Petugas", "Admin"), exportBankTransactionsExcel);
router.get("/bank/:name/pdf", protect, authorizeRoles("Petugas", "Admin"), exportBankTransactionsPDF);

// ✅ Petugas/Admin export withdraw (date range)
router.get("/withdraw/:bank/excel", protect, authorizeRoles("Petugas", "Admin"), exportWithdrawExcel);
router.get("/withdraw/:bank/pdf", protect, authorizeRoles("Petugas", "Admin"), exportWithdrawPDF);

// ✅ Petugas/Admin export penjualan pengepul (date range)
router.get("/sales/:bank/excel", protect, authorizeRoles("Petugas", "Admin"), exportSalesExcel);
router.get("/sales/:bank/pdf", protect, authorizeRoles("Petugas", "Admin"), exportSalesPDF);

export default router;
