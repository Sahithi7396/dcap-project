// src/controllers/appointmentsController.js

const supabase         = require('../config/supabase');
const { sendSuccess, sendError } = require('../utils/response');
const { asyncHandler } = require('../middleware/errorHandler');
const { v4: uuidv4 }   = require('uuid');

// ── POST /api/appointments ────────────────────────────────────────────────
// Book a new appointment
const bookAppointment = asyncHandler(async (req, res) => {
  const {
    citizen_name,
    mobile,
    email,
    department,
    purpose,
    preferred_date,   // ISO date string e.g. "2024-07-15"
    preferred_slot,   // e.g. "10:00 AM - 11:00 AM"
    address,
  } = req.body;

  // Confirm preferred_date is not in the past
  if (new Date(preferred_date) < new Date()) {
    return sendError(res, 'Preferred date must be a future date', 400);
  }

  const token = `APT-${Date.now().toString(36).toUpperCase()}-${uuidv4().slice(0, 4).toUpperCase()}`;

  const { data, error } = await supabase
    .from('appointments')
    .insert([
      {
        id: uuidv4(),
        booking_token: token,
        citizen_name,
        mobile,
        email:          email    || null,
        department,
        purpose,
        preferred_date,
        preferred_slot: preferred_slot || null,
        address:        address  || null,
        status:         'Pending',   // Pending → Confirmed → Completed → Cancelled
        created_at:     new Date().toISOString(),
        updated_at:     new Date().toISOString(),
      },
    ])
    .select()
    .single();

  if (error) return sendError(res, error.message, 500);

  sendSuccess(
    res,
    { appointment: data, booking_token: token },
    'Appointment booked. Save your booking token for reference.',
    201
  );
});

// ── GET /api/appointments/:token ──────────────────────────────────────────
// View appointment by booking token
const getAppointment = asyncHandler(async (req, res) => {
  const { token } = req.params;

  const { data, error } = await supabase
    .from('appointments')
    .select('*')
    .eq('booking_token', token.toUpperCase())
    .single();

  if (error || !data) return sendError(res, 'Appointment not found. Check your booking token.', 404);
  sendSuccess(res, { appointment: data });
});

// ── GET /api/appointments?mobile= ─────────────────────────────────────────
// View all appointments by mobile number
const getAppointmentsByMobile = asyncHandler(async (req, res) => {
  const { mobile } = req.query;
  if (!mobile) return sendError(res, 'Query param "mobile" is required', 400);

  const { data, error } = await supabase
    .from('appointments')
    .select('*')
    .eq('mobile', mobile)
    .order('preferred_date', { ascending: true });

  if (error) return sendError(res, error.message, 500);
  sendSuccess(res, { appointments: data, total: data.length });
});

module.exports = { bookAppointment, getAppointment, getAppointmentsByMobile };
