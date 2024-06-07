/* eslint-disable import/extensions */
const express = require("express");
// Importa o framework Express para a criação de servidores HTTP
const UsuarioController = require("../controllers/usuariosController.js");
// Importa o controlador de usuários, que contém a lógica de negócios para as operações de usuários
// import database from "../models";

const router = express.Router();
// Cria um novo roteador para definir as rotas

router// Define as rotas para as operações de usuários
  .post("/login", UsuarioController.logar)
  // Rota para logar um usuário. Chamará o método logar do controlador UsuarioController

  .post("/cadastrar", UsuarioController.cadastrar)
  // Rota para cadastrar um novo usuário. Chamará o método cadastrar do controlador UsuarioController

  .get("/dadosusuario", UsuarioController.pegaDadosUsuario)
  // Rota para obter os dados do usuário logado. Chamará o método pegaDadosUsuario do controlador UsuarioController

  .put("/dadosusuario", UsuarioController.atualizarSenha)
  // Rota para atualizar a senha do usuário logado. Chamará o método atualizarSenha do controlador UsuarioController

  .delete("/usuario/:id", UsuarioController.deletarUsuario);
// Rota para deletar um usuário pelo ID. Chamará o método deletarUsuario do controlador UsuarioController

module.exports = router;
// Exporta o roteador para ser utilizado em outros módulos
