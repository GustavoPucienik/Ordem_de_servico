/* eslint-disable import/extensions */
const express = require("express");
const UsuarioController = require("../controllers/usuariosController.js");
// import database from "../models";

const router = express.Router();

router
  .post("/login", UsuarioController.logar)
  .post("/cadastrar", UsuarioController.cadastrar)
  .get("/dadosusuario", UsuarioController.pegaDadosUsuario)
  .put("/dadosusuario", UsuarioController.atualizarSenha)
  .delete("/usuario/:id", UsuarioController.deletarUsuario);

module.exports = router;
