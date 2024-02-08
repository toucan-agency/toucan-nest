const express = require('express');
const router = express.Router();
const clientController = require('../controllers/clientController');

router.get('/', clientController.getClients);
router.post('/', clientController.createClient);
router.get('/sku/:sku', clientController.getClientBySku);
router.delete('/:id', clientController.deleteClient);

module.exports = router;