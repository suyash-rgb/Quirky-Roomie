const express = require('express');
const router = express.Router();

const {
  fileComplaint,
  getAllActiveComplaints,
  resolveComplaint,
  voteComplaint,
  getTrendingComplaints,
} = require('../controllers/complaintController');

const { requireAuth } = require('../middleware/authMiddleware');

// File a complaint (authenticated)
router.post('/', requireAuth, fileComplaint);

// List active complaints
router.get('/', getAllActiveComplaints);

// Mark a complaint as resolved (authenticated)
router.put('/:id/resolve', requireAuth, resolveComplaint);

// Vote (authenticated)
router.post('/:id/vote', requireAuth, voteComplaint);

// Trending complaints
router.get('/trending', getTrendingComplaints);


module.exports = router;
