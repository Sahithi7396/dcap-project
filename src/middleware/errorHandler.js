// src/middleware/errorHandler.js

const { sendError } = require('../utils/response');

// Central async error catcher — wrap route handlers with this
const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

// Express global error middleware (must be registered last)
const globalErrorHandler = (err, req, res, next) => {
  console.error(`[ERROR] ${req.method} ${req.originalUrl} →`, err.message);

  // Supabase / PostgreSQL errors
  if (err.code) {
    return sendError(res, err.message, 400);
  }

  sendError(res, err.message || 'Internal Server Error', err.statusCode || 500);
};

module.exports = { asyncHandler, globalErrorHandler };
