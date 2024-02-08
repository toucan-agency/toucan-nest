const express = require('express');
const router = express.Router();
const metaAPIController = require('../controllers/metaAPIController');

router.get('/facebookPages', metaAPIController.getAllFacebookPages);
router.get('/instagramAccounts', metaAPIController.getAllInstagramAccounts);
router.get('/adsAccounts', metaAPIController.getAllAdsAccount);

module.exports = router;