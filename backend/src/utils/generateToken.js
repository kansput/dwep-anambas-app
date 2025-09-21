// src/utils/generateToken.js
import jwt from 'jsonwebtoken';

// Tambahkan bankSampah ke parameter
const generateToken = (uid, role, email, bankSampah) => {
  if (!uid || !role || !email) {
    throw new Error('Missing required token payload data');
  }

  if (!process.env.JWT_SECRET) {
    throw new Error('JWT_SECRET not configured');
  }

  const payload = {
    uid,
    role,
    email,
    bankSampah: bankSampah || null,   // ✅ tambahin ini
    iat: Math.floor(Date.now() / 1000),
  };

  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: '24h',
    algorithm: 'HS256',
    issuer: 'dwep-backend',
    audience: 'dwep-app',
  });
};

// Refresh token tetap pakai uid (bankSampah nggak perlu di sini)
const generateRefreshToken = (uid) => {
  if (!uid) {
    throw new Error('UID required for refresh token');
  }

  if (!process.env.JWT_REFRESH_SECRET) {
    throw new Error('JWT_REFRESH_SECRET not configured');
  }

  return jwt.sign(
    { uid, type: 'refresh' },
    process.env.JWT_REFRESH_SECRET,
    {
      expiresIn: '7d',
      algorithm: 'HS256',
      issuer: 'dwep-backend',
      audience: 'dwep-app',
    }
  );
};

export { generateToken, generateRefreshToken };
