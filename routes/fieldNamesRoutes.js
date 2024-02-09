const express = require('express');
const router = express.Router();
const fieldNamesController = require('../controllers/fieldNamesController');

router.get('/', fieldNamesController.getFieldNames);

module.exports = router;