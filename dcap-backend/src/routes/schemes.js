// src/routes/schemes.js

const router = require('express').Router();
const {
  getAllSchemes,
  searchSchemes,
  filterByCategory,
  getSchemeById,
} = require('../controllers/schemesController');

// GET /api/schemes                 → paginated list
router.get('/', getAllSchemes);

// GET /api/schemes/search?q=text   → full-text search
router.get('/search', searchSchemes);

// GET /api/schemes/filter?category=Student
router.get('/filter', filterByCategory);

// GET /api/schemes/:id             → single scheme detail
router.get('/:id', getSchemeById);

module.exports = router;
