const express = require('express');
const router = express.Router();
const clientServiceController = require('../controllers/clientServiceController');

router.get('/', clientServiceController.getAllClientServices);
router.get('/client/:clientID/:serviceID', clientServiceController.getClientServiceByClientIdAndServiceId);
router.post('/create', clientServiceController.createClientService);
router.put('/update/:clientServiceID', clientServiceController.updateClientService);
router.delete('/delete/:clientID', clientServiceController.deleteClientService);


module.exports = router;
