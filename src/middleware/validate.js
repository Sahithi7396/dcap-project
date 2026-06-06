// src/middleware/validate.js

const { sendError } = require('../utils/response');

/**
 * Validate required fields on req.body.
 * @param {string[]} fields - list of required field names
 */
const requireFields = (fields) => (req, res, next) => {
  const missing = fields.filter((f) => {
    const val = req.body[f];
    return val === undefined || val === null || String(val).trim() === '';
  });

  if (missing.length > 0) {
    return sendError(res, `Missing required fields: ${missing.join(', ')}`, 400);
  }
  next();
};

module.exports = { requireFields };
