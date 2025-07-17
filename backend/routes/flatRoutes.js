const express = require('express');
const router = express.Router();
const { getFlatStats } = require('../controllers/flatController');

router.get('/flat/stats', getFlatStats);

module.exports = router;
