// src/app.js

const express     = require('express');
const cors        = require('cors');
const helmet      = require('helmet');
const morgan      = require('morgan');
const rateLimit   = require('express-rate-limit');

const schemesRoutes       = require('./routes/schemes');
const complaintsRoutes    = require('./routes/complaints');
const appointmentsRoutes  = require('./routes/appointments');
const notificationsRoutes = require('./routes/notifications');
const contactsRoutes      = require('./routes/contacts');
const { globalErrorHandler } = require('./middleware/errorHandler');
const { sendSuccess, sendError } = require('./utils/response');

const app = express();

// ── Security & utility middleware ─────────────────────────────────────────
app.use(helmet());
app.use(cors({
  origin:  process.env.ALLOWED_ORIGIN || '*',
  methods: ['GET', 'POST', 'PATCH', 'DELETE'],
}));
app.use(express.json({ limit: '10kb' }));
app.use(morgan(process.env.NODE_ENV === 'production' ? 'combined' : 'dev'));

// ── Rate limiting ─────────────────────────────────────────────────────────
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,   // 15 minutes
  max:      100,               // max 100 requests per window per IP
  standardHeaders: true,
  legacyHeaders:   false,
  message: { success: false, message: 'Too many requests, please try again later.' },
});
app.use('/api', limiter);

// ── Health check ──────────────────────────────────────────────────────────
app.get('/api/health', (req, res) => {
  sendSuccess(res, { status: 'OK', timestamp: new Date().toISOString() }, 'DCAP API is running');
});

// ── Route mounting ────────────────────────────────────────────────────────
app.use('/api/schemes',       schemesRoutes);
app.use('/api/complaints',    complaintsRoutes);
app.use('/api/appointments',  appointmentsRoutes);
app.use('/api/notifications', notificationsRoutes);
app.use('/api/contacts',      contactsRoutes);

// ── 404 handler ───────────────────────────────────────────────────────────
app.use((req, res) => sendError(res, `Route ${req.method} ${req.originalUrl} not found`, 404));

// ── Global error handler ──────────────────────────────────────────────────
app.use(globalErrorHandler);

module.exports = app;
