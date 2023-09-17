/* eslint-disable import/extensions */
/* eslint-disable import/no-extraneous-dependencies */
require("dotenv/config");
const express = require("express");
const bodyParser = require("body-parser");
const routes = require("./rotas/index.js");

const app = express();
app.use(bodyParser.json());
routes(app);

module.exports = app;
