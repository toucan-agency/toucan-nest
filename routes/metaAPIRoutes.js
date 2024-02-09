const express = require('express');
const router = express.Router();
const metaAPIController = require('../controllers/metaAPIController');

router.get('/facebookPages', metaAPIController.getAllFacebookPages);
router.get('/instagramAccounts', metaAPIController.getAllInstagramAccounts);
router.get('/adsAccounts', metaAPIController.getAllAdsAccount);
router.post('/reportSMAdsAccountLevel', metaAPIController.getReportSMAdsAccountLevel);
router.get('/getReportSMAdsAccountLevelFromDB/:clientId/:since', metaAPIController.getReportSMAdsAccountLevelFromDB);
router.get('/facebook_posts/:clientId/:pageId/:date', metaAPIController.getFacebookPosts);

module.exports = router;