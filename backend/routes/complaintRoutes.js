const express = require('express');
const router = express.Router();

const {
  fileComplaint,
  getAllActiveComplaints,
  resolveComplaint
} = require('../controllers/complaintController');

const { requireAuth } = require('../middleware/authMiddleware');

// File a complaint (authenticated)
router.post('/', requireAuth, fileComplaint);

// List active complaints
router.get('/', getAllActiveComplaints);

// Mark a complaint as resolved (authenticated)
router.put('/:id/resolve', requireAuth, resolveComplaint);

module.exports = router;
