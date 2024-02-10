const MetaAPIHandler = require('../externalAPI/MetaAPI/MetaAPIHandler');
const { findActionValue, findCostPerActionValue, findPostInsightsDataValue, findPostActionDataSummaryTotalCount, replaceInvalidUTF8Characters } = require('./dataProcessing');
const ReportSMAdsAccountLevel = require('../models/reportSMAdsAccountLevel');
const ReportSMAdsPostLevel = require('../models/reportSMAdsPostLevel');
const { Op } = require('sequelize');

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

exports.getReportSMAdsAccountLevel = async (req, res) => {
    try {
      const { accountID, clientId, since, until } = req.body;
      const data = await MetaAPIHandler.getReportSMAdsAccountLevel(accountID, since, until);
  
      const processedData = data.map(page => ({
        clientId: clientId,
        accountID: page.account_id,
        dateRangeStart: page.date_start,
        dateRangeEnd: page.date_stop,
        reach: Number(page.reach),
        impressions: Number(page.impressions),
        clicks: Number(page.clicks),
        linkClicks: findActionValue(page, "link_click"),
        comments: findActionValue(page, "comment"),
        shares: findActionValue(page, "share"),
        reactions: findActionValue(page, "post_reaction"),
        postEngagements: findActionValue(page, "post_engagement"),
        spend: Number(page.spend),
        ctr: Number(page.ctr),
        frequency: Number(page.frequency),
        video_p25_watched_actions: findActionValue(page, "video_25p_watched_actions"),
        video_p50_watched_actions: findActionValue(page, "video_50p_watched_actions"),
        video_p75_watched_actions: findActionValue(page, "video_75p_watched_actions"),
        video_p100_watched_actions: findActionValue(page, "video_100p_watched_actions"),
      }));

      await ReportSMAdsAccountLevel.destroy({
        where: {
          clientId: clientId,
          accountID: accountID.substring(4),
          dateRangeStart: since
        }
      });

      await ReportSMAdsAccountLevel.bulkCreate(processedData);
  
      res.status(200).json({ message: 'Data processed and saved successfully' });
    } catch (error) {
      console.error('An error occurred while fetching and storing data:', error);
      res.status(500).json({ message: 'An error occurred while processing data' });
    }
  };

  exports.getReportSMAdsAccountLevelFromDB = async (req, res, next) => {
    const { clientId, since } = req.params;
    try {
        const data = await ReportSMAdsAccountLevel.findAll({
            where: {
                clientId: clientId,
                dateRangeStart: since,
            },
        });
        console.log(data);
        res.json(data);
    } catch (error) {
        console.error('An error occurred while fetching data from the database:', error);
        res.status(500).json({ message: error.message });
    }
}

exports.getFAllFacebookPagePosts = async (req, res) => {
    try {
        const { clientId, pageId, since, until } = req.body;
        const data = await MetaAPIHandler.getFacebookPagePosts(pageId, since, until);
        
        const processData = data.map(page => ({
            clientId: clientId,
            pageId: pageId,
            postId: page.id,
            message: replaceInvalidUTF8Characters(page.message),
            postImageUrl: page.full_picture,
            permalinkUrl: page.permalink_url,
            impressions: findPostInsightsDataValue(page, "post_impressions"),
            reach: findPostInsightsDataValue(page, "post_impressions_unique"),
            clicks: findPostInsightsDataValue(page, "post_clicks"),
            comments: findPostActionDataSummaryTotalCount(page, "comment"),
            shares: findPostActionDataSummaryTotalCount(page, "share"),
            reactions: findPostActionDataSummaryTotalCount(page, "reactions"),
            createdTime: page.created_time,
            dateRangeStart: since,
            dateRangeEnd: until
        }));

        //console.log(processData);
        await ReportSMAdsPostLevel.destroy({
            where: {
              clientId: clientId,
              pageId: pageId.substring(4),
              dateRangeStart: since
            }
          });

        await ReportSMAdsPostLevel.bulkCreate(processData);
        res.status(200).json({ message: 'Data processed and saved successfully' });
    } catch (error) {
        console.error('An error occurred while fetching and storing data:', error);
        res.status(500).json({ message: 'An error occurred while processing data' });
      }
}

exports.getFacebookPosts = async (req, res) => {
    const { clientId, pageId, date } = req.params;
    try {
        const posts = await ReportSMAdsPostLevel.findAll({
            where: {
                clientId: clientId,
                pageId: pageId,
                dateRangeStart: date
            }
        });
        res.json(posts);
    } catch (error) {
        console.error('An error occurred while fetching data from the database:', error);
        res.status(500).json({ message: error.message });
    }
}