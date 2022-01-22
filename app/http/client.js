const axios = require("axios");
const config = require("../../config");

const eleveniaInstance = axios.create({
  baseURL: config.httpClient.baseURL,
  timeout: 60000,
  headers: { openapikey: config.httpClient.apiKey },
});

module.exports = eleveniaInstance;
