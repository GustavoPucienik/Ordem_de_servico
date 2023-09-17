/* eslint-disable import/extensions */
const express = require("express");
const UsuarioController = require("../controllers/usuariosController.js");
// import database from "../models";

const router = express.Router();

router
  .get("/login", UsuarioController.logar)
  .get("/cadastrar", UsuarioController.cadastrar);

module.exports = router;
