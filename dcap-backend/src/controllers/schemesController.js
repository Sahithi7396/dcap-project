// src/controllers/schemesController.js

const supabase          = require('../config/supabase');
const { sendSuccess, sendError } = require('../utils/response');
const { asyncHandler }  = require('../middleware/errorHandler');

// ── GET /api/schemes ───────────────────────────────────────────────────────
// Query params: page, limit
const getAllSchemes = asyncHandler(async (req, res) => {
  const page  = Math.max(1, parseInt(req.query.page)  || 1);
  const limit = Math.min(100, parseInt(req.query.limit) || 20);
  const from  = (page - 1) * limit;
  const to    = from + limit - 1;

  const { data, error, count } = await supabase
    .from('schemes')
    .select('*', { count: 'exact' })
    .order('scheme_name', { ascending: true })
    .range(from, to);

  if (error) return sendError(res, error.message, 500);

  sendSuccess(res, {
    schemes: data,
    pagination: { page, limit, total: count, totalPages: Math.ceil(count / limit) },
  });
});

// ── GET /api/schemes/search?q= ────────────────────────────────────────────
const searchSchemes = asyncHandler(async (req, res) => {
  const q = (req.query.q || '').trim();
  if (!q) return sendError(res, 'Search query "q" is required', 400);

  const { data, error } = await supabase
    .from('schemes')
    .select('*')
    .or(
      `scheme_name.ilike.%${q}%,` +
      `benefits.ilike.%${q}%,` +
      `eligibility.ilike.%${q}%,` +
      `department.ilike.%${q}%`
    )
    .order('scheme_name');

  if (error) return sendError(res, error.message, 500);
  sendSuccess(res, { schemes: data, total: data.length });
});

// ── GET /api/schemes/filter?category= ────────────────────────────────────
// category values: General | Student | Farmer  (case-insensitive)
const filterByCategory = asyncHandler(async (req, res) => {
  const category = (req.query.category || '').trim();
  if (!category) return sendError(res, 'Query param "category" is required', 400);

  const { data, error } = await supabase
    .from('schemes')
    .select('*')
    .ilike('category', category)
    .order('scheme_name');

  if (error) return sendError(res, error.message, 500);
  sendSuccess(res, { schemes: data, total: data.length });
});

// ── GET /api/schemes/:id ──────────────────────────────────────────────────
const getSchemeById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const { data, error } = await supabase
    .from('schemes')
    .select('*')
    .eq('id', id)
    .single();

  if (error || !data) return sendError(res, 'Scheme not found', 404);
  sendSuccess(res, { scheme: data });
});

module.exports = { getAllSchemes, searchSchemes, filterByCategory, getSchemeById };
