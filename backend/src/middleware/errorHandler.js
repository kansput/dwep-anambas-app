// src/middleware/errorHandler.js

const errorHandler = (err, req, res, next) => {
  // Ambil status code dari respons jika sudah ada, jika tidak, default ke 500
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  
  // Log eror lengkap di server untuk debugging (include sensitive info)
  console.error('ERROR:', {
    message: err.message,
    stack: err.stack,
    endpoint: req.originalUrl,
    method: req.method,
    ip: req.ip,
    userAgent: req.get('User-Agent'),
    userId: req.user?.userId || 'unauthenticated',
    timestamp: new Date().toISOString(),
  });

  // Response ke client (filter sensitive info)
  const response = {
    error: true,
    timestamp: new Date().toISOString(),
  };

  if (process.env.NODE_ENV === 'production') {
    // Production: Generic messages aja
    switch (statusCode) {
      case 400:
        response.message = 'Bad request';
        break;
      case 401:
        response.message = 'Authentication required';
        break;
      case 403:
        response.message = 'Access forbidden';
        break;
      case 404:
        response.message = 'Resource not found';
        break;
      case 429:
        response.message = 'Too many requests';
        break;
      default:
        response.message = 'Internal server error';
    }
  } else {
    // Development: Show actual error tapi tetap aman
    response.message = err.message;
    response.stack = err.stack;
    response.endpoint = req.originalUrl;
  }

  res.status(statusCode).json(response);
};

export { errorHandler };