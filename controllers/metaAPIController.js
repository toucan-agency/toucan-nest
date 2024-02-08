const MetaAPIHandler = require('../externalAPI/MetaAPI/MetaAPIHandler');

exports.getAllInstagramAccounts = async (req, res) => {
    try {
        const instagramAccounts = await MetaAPIHandler.getAllInstagramAccounts();
        res.status(200).json(instagramAccounts);
    } catch (err) {
        next(err);
    }
};

exports.getAllFacebookPages = async (req, res) => {
    try {
        const facebookPages = await MetaAPIHandler.getAllFacebookPages();
        res.status(200).json(facebookPages);
    } catch (err) {
        next(err);
    }
};

exports.getAllAdsAccount = async (req, res) => {
    try {
        const adsAccounts = await MetaAPIHandler.getAllAdsAccount();
        res.status(200).json(adsAccounts);
    } catch (err) {
        next(err);
    }
};