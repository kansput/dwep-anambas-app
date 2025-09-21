// src/routes/saleRoutes.js
import express from "express";
import { jualKePengepul, getBankSales } from "../controllers/saleController.js";
import { protect } from "../middleware/authMiddleware.js";
import { authorizeRoles } from "../middleware/roleMiddleware.js";

const router = express.Router();

// Petugas/Admin jual ke pengepul
router.post("/", protect, authorizeRoles("Petugas", "Admin"), jualKePengepul);

// Petugas/Admin lihat penjualan bank
router.get("/bank/:name", protect, authorizeRoles("Petugas", "Admin"), getBankSales);

export default router;
