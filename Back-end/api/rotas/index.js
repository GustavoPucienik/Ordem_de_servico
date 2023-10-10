/* eslint-disable import/extensions */
const express = require("express");
const usuarios = require("./usuariosRoutes.js");
const ordens = require("./ordensRoutes.js");

const routes = (app) => {
  app.route("/").get((req, res) => {
    res.status(200).send("Pagina Home");
  });

  app.use(
    express.json(),
    usuarios,
    ordens,
  );
};

module.exports = routes;
