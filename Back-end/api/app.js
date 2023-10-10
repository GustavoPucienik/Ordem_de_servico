/* eslint-disable import/extensions */
/* eslint-disable import/no-extraneous-dependencies */
require("dotenv/config");
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const routes = require("./rotas/index.js");

const app = express();

// Configure o CORS com opções mais restritivas
const corsOptions = {
  origin: "*", // Substitua pelo domínio do seu frontend em produção
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  allowedHeaders: "Content-Type,Authorization",
};

app.use(cors(corsOptions));
app.use(bodyParser.json());
routes(app);

module.exports = app;
