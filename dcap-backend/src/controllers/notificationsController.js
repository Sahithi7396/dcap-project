// src/controllers/notificationsController.js

const supabase         = require('../config/supabase');
const { sendSuccess, sendError } = require('../utils/response');
const { asyncHandler } = require('../middleware/errorHandler');

// ── GET /api/notifications ────────────────────────────────────────────────
// Query params: type (info|alert|update), page, limit
const getNotifications = asyncHandler(async (req, res) => {
  const page  = Math.max(1, parseInt(req.query.page)  || 1);
  const limit = Math.min(50, parseInt(req.query.limit) || 10);
  const from  = (page - 1) * limit;
  const to    = from + limit - 1;
  const type  = req.query.type || null;

  let query = supabase
    .from('notifications')
    .select('*', { count: 'exact' })
    .eq('is_active', true)
    .order('created_at', { ascending: false })
    .range(from, to);

  if (type) query = query.eq('type', type);

  const { data, error, count } = await query;

  if (error) return sendError(res, error.message, 500);

  sendSuccess(res, {
    notifications: data,
    pagination: { page, limit, total: count, totalPages: Math.ceil(count / limit) },
  });
});

// ── GET /api/notifications/:id ────────────────────────────────────────────
const getNotificationById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const { data, error } = await supabase
    .from('notifications')
    .select('*')
    .eq('id', id)
    .eq('is_active', true)
    .single();

  if (error || !data) return sendError(res, 'Notification not found', 404);
  sendSuccess(res, { notification: data });
});

module.exports = { getNotifications, getNotificationById };
