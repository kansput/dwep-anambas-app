// src/middleware/validateRequest.js
import { validationResult } from 'express-validator';

// Middleware ini bertugas menangkap semua eror validasi
const validateRequest = (req, res, next) => {
  const errors = validationResult(req);
  
  // Jika ada eror, hentikan proses dan kirim respons 400
  if (!errors.isEmpty()) {
    // Log validation errors untuk monitoring (tanpa sensitive data)
    console.warn('Validation failed:', {
      ip: req.ip,
      userAgent: req.get('User-Agent'),
      endpoint: req.path,
      method: req.method,
      errorCount: errors.array().length,
      timestamp: new Date().toISOString()
    });

    return res.status(400).json({
      error: 'Validation failed',
      message: 'Data yang dikirim tidak valid',
      details: errors.array().map(err => ({
        field: err.path,
        message: err.msg,
        value: err.value ? '[FILTERED]' : undefined // Jangan expose actual value
      }))
    });
  }
  
  // Jika tidak ada eror, lanjutkan ke controller
  next();
};

export { validateRequest };