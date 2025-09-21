import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import session from "express-session";
import cors from "cors"; // ✅ Tambahkan cors
import passport from "./src/config/passport.js";

import sampahRoutes from "./src/routes/sampahRoutes.js";
import transactionRoutes from "./src/routes/transactionRoutes.js";
import userRoutes from "./src/routes/userRoutes.js";
import withdrawRoutes from "./src/routes/withdrawRoutes.js";
import saleRoutes from "./src/routes/saleRoutes.js";
import reportRoutes from "./src/routes/reportRoutes.js";
import authRoutes from "./src/routes/authRoutes.js";

import { setupSecurity } from "./src/config/security.js";
import { errorHandler } from "./src/middleware/errorHandler.js";

dotenv.config();
const app = express();

// Middleware dasar
app.use(express.json()); // agar bisa baca JSON
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// ✅ Open CORS (sementara untuk testing)
app.use(cors());

// 🔐 Security middleware
setupSecurity(app);

// 🔑 Passport session
app.use(
  session({ secret: "secret", resave: false, saveUninitialized: true })
);
app.use(passport.initialize());
app.use(passport.session());

// Endpoint tes
app.get("/", (req, res) => {
  res.send("DWEP API is running securely...");
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/sampah", sampahRoutes);
app.use("/api/transactions", transactionRoutes);
app.use("/api/users", userRoutes);
app.use("/api/withdraw", withdrawRoutes);
app.use("/api/sales", saleRoutes);
app.use("/api/reports", reportRoutes);

// Error handler
app.use(errorHandler);

// Jalankan server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(
    `DWEP Backend running in ${process.env.NODE_ENV} mode on port ${PORT}`
  )
);
