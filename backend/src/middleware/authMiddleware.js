import jwt from "jsonwebtoken";
import { db } from "../config/firebase.js";

// 🔹 Middleware untuk cek token JWT
export const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      console.log("🔍 Token received:", token ? "✅ Present" : "❌ Missing");

      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log("🔍 Decoded token:", { uid: decoded.uid, role: decoded.role, email: decoded.email });

      // Cari user di Firestore
      const userDoc = await db.collection("users").doc(decoded.uid).get();
      if (!userDoc.exists) {
        console.log("❌ User not found in database:", decoded.uid);
        return res.status(401).json({ message: "User tidak ditemukan" });
      }

      const userData = userDoc.data();
      console.log("🔍 User found:", { uid: decoded.uid, role: userData.role, status: userData.status });

      // ✅ Set req.user dengan struktur yang konsisten
      req.user = { 
        id: decoded.uid,        // ID yang digunakan di controller
        uid: decoded.uid,       // Untuk kompatibilitas
        email: decoded.email,   // Email dari token
        role: userData.role,    // Role dari database
        status: userData.status,// Status dari database
        ...userData             // Spread semua data user
      };
      
      next();
    } catch (error) {
      console.error("❌ Auth error:", error.message);
      
      if (error.name === 'TokenExpiredError') {
        return res.status(401).json({ message: "Token sudah expired" });
      } else if (error.name === 'JsonWebTokenError') {
        return res.status(401).json({ message: "Token tidak valid" });
      }
      
      return res.status(401).json({ message: "Token tidak valid" });
    }
  } else {
    console.log("❌ No authorization header found");
    return res.status(401).json({ message: "Tidak ada token, akses ditolak" });
  }
};

// 🔹 Middleware untuk cek role user
export const requireRole = (roles) => {
  return (req, res, next) => {
    console.log("🔍 Checking role requirement:", { 
      requiredRoles: roles, 
      userRole: req.user?.role,
      userId: req.user?.id
    });

    if (!req.user) {
      console.log("❌ No user in request");
      return res.status(403).json({ message: "User tidak terautentikasi" });
    }

    if (!req.user.role) {
      console.log("❌ No role found for user");
      return res.status(403).json({ message: "Role user tidak ditemukan" });
    }

    const userRole = req.user.role.toLowerCase();
    const allowedRoles = roles.map(role => role.toLowerCase());

    if (!allowedRoles.includes(userRole)) {
      console.log("❌ Role not authorized:", { userRole, allowedRoles });
      return res.status(403).json({ message: "Akses ditolak, role tidak sesuai" });
    }

    console.log("✅ Role authorized:", userRole);
    next();
  };
};