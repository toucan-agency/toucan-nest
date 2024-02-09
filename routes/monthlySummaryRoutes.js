// routes/monthlySummaryRoutes.js

const express = require('express');
const router = express.Router();
const monthlySummaryController = require('../controllers/monthlySummaryController');

router.get('/service_id/:id', monthlySummaryController.getMonthlySummaries);
router.post('/post', monthlySummaryController.createMonthlySummary);

module.exports = router;