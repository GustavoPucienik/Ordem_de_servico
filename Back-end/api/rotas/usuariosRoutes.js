/* eslint-disable import/extensions */
const express = require("express");
const UsuarioController = require("../controllers/usuariosController.js");
// import database from "../models";

const router = express.Router();

router
  .get("/login", UsuarioController.logar)
  .post("/cadastrar", UsuarioController.cadastrar)
  .delete("", UsuarioController.deletarUsuario);

module.exports = router;
