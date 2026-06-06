// src/routes/notifications.js

const router = require('express').Router();
const { getNotifications, getNotificationById } = require('../controllers/notificationsController');

// GET /api/notifications            → list (with optional ?type= filter)
router.get('/', getNotifications);

// GET /api/notifications/:id        → single notification
router.get('/:id', getNotificationById);

module.exports = router;
