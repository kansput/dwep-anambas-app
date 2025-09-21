// src/config/security.js
import helmet from "helmet";
import cors from "cors";
import rateLimit from "express-rate-limit";

export const setupSecurity = (app) => {
  // 🛡️ Helmet: set HTTP headers lebih aman
  app.use(helmet());

  // 🌍 CORS: hanya allow domain tertentu
  app.use(
    cors({
      origin: process.env.ALLOWED_ORIGINS?.split(",") || "*", // contoh: "http://localhost:3000,https://myapp.com"
      methods: ["GET", "POST", "PUT", "DELETE"],
      credentials: true,
    })
  );

  // 🚦 Rate limiter: batasi request biar gak spam/DoS
  const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 menit
    max: 100, // max 100 request per IP
    message: { error: "Terlalu banyak request, coba lagi nanti." },
  });
  app.use(limiter);
};
