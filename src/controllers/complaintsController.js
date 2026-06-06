// src/controllers/complaintsController.js

const supabase         = require('../config/supabase');
const { sendSuccess, sendError } = require('../utils/response');
const { asyncHandler } = require('../middleware/errorHandler');
const { v4: uuidv4 }   = require('uuid');

// ── POST /api/complaints ──────────────────────────────────────────────────
// Register a new complaint
const registerComplaint = asyncHandler(async (req, res) => {
  const {
    citizen_name,
    mobile,
    email,
    department,
    subject,
    description,
    address,
  } = req.body;

  // Generate a human-readable tracking token  e.g. CMP-20240601-A3F2
  const token = `CMP-${Date.now().toString(36).toUpperCase()}-${uuidv4().slice(0, 4).toUpperCase()}`;

  const { data, error } = await supabase
    .from('complaints')
    .insert([
      {
        id: uuidv4(),
        tracking_token: token,
        citizen_name,
        mobile,
        email:       email       || null,
        department,
        subject,
        description,
        address:     address     || null,
        status:      'Registered',  // Registered → In Progress → Resolved → Closed
        created_at:  new Date().toISOString(),
        updated_at:  new Date().toISOString(),
      },
    ])
    .select()
    .single();

  if (error) return sendError(res, error.message, 500);

  sendSuccess(
    res,
    { complaint: data, tracking_token: token },
    'Complaint registered successfully. Save your tracking token.',
    201
  );
});

// ── GET /api/complaints/:token ────────────────────────────────────────────
// Track complaint by token
const trackComplaint = asyncHandler(async (req, res) => {
  const { token } = req.params;

  const { data, error } = await supabase
    .from('complaints')
    .select('id, tracking_token, citizen_name, department, subject, status, created_at, updated_at, remarks')
    .eq('tracking_token', token.toUpperCase())
    .single();

  if (error || !data) return sendError(res, 'Complaint not found. Check your tracking token.', 404);
  sendSuccess(res, { complaint: data });
});

// ── PATCH /api/complaints/:token/status ───────────────────────────────────
// Update status (admin use)
const updateComplaintStatus = asyncHandler(async (req, res) => {
  const { token }   = req.params;
  const { status, remarks } = req.body;

  const allowed = ['Registered', 'In Progress', 'Resolved', 'Closed'];
  if (!status || !allowed.includes(status)) {
    return sendError(res, `Status must be one of: ${allowed.join(', ')}`, 400);
  }

  const { data, error } = await supabase
    .from('complaints')
    .update({ status, remarks: remarks || null, updated_at: new Date().toISOString() })
    .eq('tracking_token', token.toUpperCase())
    .select()
    .single();

  if (error || !data) return sendError(res, 'Complaint not found', 404);
  sendSuccess(res, { complaint: data }, 'Status updated successfully');
});

module.exports = { registerComplaint, trackComplaint, updateComplaintStatus };
