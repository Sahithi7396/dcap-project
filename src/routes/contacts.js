// src/routes/contacts.js

const router = require('express').Router();
const { getDepartmentContacts, getContactById } = require('../controllers/contactsController');

// GET /api/contacts                 → all contacts (optional ?department= filter)
router.get('/', getDepartmentContacts);

// GET /api/contacts/:id             → single contact
router.get('/:id', getContactById);

module.exports = router;
