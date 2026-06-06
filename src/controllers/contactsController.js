// src/controllers/contactsController.js

const supabase         = require('../config/supabase');
const { sendSuccess, sendError } = require('../utils/response');
const { asyncHandler } = require('../middleware/errorHandler');

// ── GET /api/contacts ─────────────────────────────────────────────────────
// Query params: department
const getDepartmentContacts = asyncHandler(async (req, res) => {
  const { department } = req.query;

  let query = supabase
    .from('contacts')
    .select('*')
    .eq('is_active', true)
    .order('department', { ascending: true });

  if (department) {
    query = query.ilike('department', `%${department}%`);
  }

  const { data, error } = await query;

  if (error) return sendError(res, error.message, 500);
  sendSuccess(res, { contacts: data, total: data.length });
});

// ── GET /api/contacts/:id ─────────────────────────────────────────────────
const getContactById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const { data, error } = await supabase
    .from('contacts')
    .select('*')
    .eq('id', id)
    .single();

  if (error || !data) return sendError(res, 'Contact not found', 404);
  sendSuccess(res, { contact: data });
});

module.exports = { getDepartmentContacts, getContactById };
