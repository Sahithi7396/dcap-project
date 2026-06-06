// src/routes/appointments.js

const router = require('express').Router();
const {
  bookAppointment,
  getAppointment,
  getAppointmentsByMobile,
} = require('../controllers/appointmentsController');
const { requireFields } = require('../middleware/validate');

// POST /api/appointments                        → book appointment
router.post(
  '/',
  requireFields(['citizen_name', 'mobile', 'department', 'purpose', 'preferred_date']),
  bookAppointment
);

// GET  /api/appointments?mobile=9999999999      → list by mobile
router.get('/', getAppointmentsByMobile);

// GET  /api/appointments/:token                 → view by booking token
router.get('/:token', getAppointment);

module.exports = router;
