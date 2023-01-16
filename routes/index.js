const express = require("express");
const app = express();

const authApi = require("./auth");

const api = "/api/v1";

// all routes api will define in here
app.use(api, authApi);

module.exports = app;
