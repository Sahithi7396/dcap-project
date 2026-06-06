// src/routes/complaints.js

const router = require('express').Router();
const {
  registerComplaint,
  trackComplaint,
  updateComplaintStatus,
} = require('../controllers/complaintsController');
const { requireFields } = require('../middleware/validate');

// POST /api/complaints                          → register new complaint
router.post(
  '/',
  requireFields(['citizen_name', 'mobile', 'department', 'subject', 'description']),
  registerComplaint
);

// GET  /api/complaints/:token                   → track by token
router.get('/:token', trackComplaint);

// PATCH /api/complaints/:token/status           → update status (admin)
router.patch('/:token/status', requireFields(['status']), updateComplaintStatus);

module.exports = router;
