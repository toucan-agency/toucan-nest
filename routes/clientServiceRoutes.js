const express = require('express');
const router = express.Router();
const clientServiceController = require('../controllers/clientServiceController');

router.get('/', clientServiceController.getClientServices);
router.post('/', clientServiceController.createClientService);

module.exports = router;
