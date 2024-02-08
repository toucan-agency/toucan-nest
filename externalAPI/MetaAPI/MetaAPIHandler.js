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