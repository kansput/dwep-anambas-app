// src/middleware/roleMiddleware.js

// Middleware untuk cek role user (dengan normalisasi huruf kecil)
export const authorizeRoles = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user || !req.user.role) {
      return res.status(401).json({ message: "Tidak ada role, akses ditolak" });
    }

    // Normalisasi ke lowercase
    const userRole = req.user.role.toLowerCase();
    const allowed = allowedRoles.map(r => r.toLowerCase());

    if (!allowed.includes(userRole)) {
      return res.status(403).json({ message: "Akses ditolak, role tidak sesuai" });
    }

    next();
  };
};
