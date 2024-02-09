const { all } = require("../../routes/clientRoutes");

require('dotenv').config();

const graphAPIUrl = `${process.env.GRAPH_API_URL}/${process.env.GRAPH_API_VERSION}`;
const token = process.env.META_API_TOKEN;
const busAssetID = process.env.META_BUSSINESS_ASSET_GROUP_ID;
const bmID = process.env.META_BUSINESS_MANAGER_ID;

exports.checkToken = async () => {
  const checkTokenUrl = `${graphAPIUrl}/debug_token?input_token=${token}`;
  console.log('Checking token...');
  console.log(checkTokenUrl);
  try {
    const response = await fetch(checkTokenUrl, {
      headers: { 'Authorization': `Bearer ${token}` }
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json(); // Przetwórz dane zgodnie z wymaganiami Twojej bazy danych
    console.log(data);
    return data;
  } catch (error) {
    console.error('An error occurred while fetching and storing data:', error);
  }
};

exports.getAllFacebookPages = async () => {
  try {
    const baseUrl = `${graphAPIUrl}/${bmID}/client_pages?limit=100&fields=name`;
    let allPages = [];
    let nextUrl = baseUrl;

    do {
      const response = await fetch(nextUrl, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        muteHttpExceptions: true
      });

      let data = await response.json();
      allPages = allPages.concat(data.data);

      nextUrl = data.paging && data.paging.next ? data.paging.next : null;
    }
    while (nextUrl);

    console.log(allPages.length);
    return allPages;
  } catch (error) {
    console.error('An error occurred while fetching and storing data:', error);
    return null;
  }
}

exports.getAllAdsAccount = async () => {
  try {
    const baseUrl = `${graphAPIUrl}/${bmID}/client_ad_accounts?fields=name&limit=100`;
    let allPages = [];
    let nextUrl = baseUrl;

    do {
      const response = await fetch(nextUrl, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        muteHttpExceptions: true
      });

      let data = await response.json();
      allPages = allPages.concat(data.data);

      nextUrl = data.paging && data.paging.next ? data.paging.next : null;
    }
    while (nextUrl);

    console.log(allPages.length);
    return allPages;
  } catch (error) {
    console.error('An error occurred while fetching and storing data:', error);
    return null;
  }
}

exports.getAllInstagramAccounts = async () => {
  try {
    const baseUrl = `${graphAPIUrl}/${bmID}/instagram_accounts?limit=100&fields=username,profile_pic`;
    let allPages = [];
    let nextUrl = baseUrl;

    do {
      const response = await fetch(nextUrl, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        muteHttpExceptions: true
      });

      let data = await response.json();
      allPages = allPages.concat(data.data);

      nextUrl = data.paging && data.paging.next ? data.paging.next : null;
    }
    while (nextUrl);

    console.log(allPages.length);
    return allPages;
  } catch (error) {
    console.error('An error occurred while fetching and storing data:', error);
    return null;
  }
}

exports.getReportSMAdsAccountLevel = async (accountID, since, until) => {
  try {
    const baseUrl = `${graphAPIUrl}/${accountID}/insights?fields=reach,impressions,actions,cost_per_action_type,clicks,video_p25_watched_actions,spend,video_p50_watched_actions,video_p75_watched_actions,video_p100_watched_actions,ctr,account_id,frequency&time_ranges=[{"since":"${since}","until":"${until}"}]&level=account&limit=100`;
    console.log(baseUrl);
    let allPages = [];
    let nextUrl = baseUrl;

    do {
      const response = await fetch(nextUrl, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        muteHttpExceptions: true
      });

      let data = await response.json();
      allPages = allPages.concat(data.data);

      nextUrl = data.paging && data.paging.next ? data.paging.next : null;
    }
    while (nextUrl);

    console.log(allPages.length);
    return allPages;
  } catch (error) {
    console.error('An error occurred while fetching and storing data:', error);
    return null;
  }
}

exports.getFacebookPageAccessToken = async (pageID) => {
  try {
    const baseUrl = `${graphAPIUrl}/${pageID}?fields=access_token`;
    const response = await fetch(baseUrl, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      muteHttpExceptions: true
    });
    let data = await response.json();
    //console.log(data.access_token);
    return data.access_token;
  } catch (error) {
    console.error('An error occurred while fetching and storing data:', error);
    return null;
  }
}

exports.getFacebookPagePosts = async (pageID, since, until) => {
  try {
    const access_token = await this.getFacebookPageAccessToken(pageID);
    const baseUrl = `${graphAPIUrl}/${pageID}/posts?fields=message,created_time,full_picture,permalink_url,id,insights.metric(post_impressions,post_impressions_unique,post_clicks),reactions.summary(true).limit(0),shares.summary(true).limit(0),comments.summary(true).limit(0)&until=${until}&since=${since}`;
    let allPages = [];
    let nextUrl = baseUrl;

    do {
      const response = await fetch(nextUrl, {
        headers: {
          'Authorization': `Bearer ${access_token}`,
        },
        muteHttpExceptions: true
      });
      let data = await response.json();
      allPages = allPages.concat(data.data);
      nextUrl = data.paging && data.paging.next ? data.paging.next : null;
    }
    while (nextUrl);

    console.log(allPages);
    return allPages

  } catch (error) {
    console.error('An error occurred while fetching and storing data:', error);
    return null;
  }
}
