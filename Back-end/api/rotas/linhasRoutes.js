/* eslint-disable import/extensions */
const express = require("express");
// Importa o framework Express para a criação de servidores HTTP
const LinhasController = require("../controllers/linhasController.js");
// Importa o controlador de linhas, que contém a lógica de negócios para as operações de linha

const router = express.Router();
// Cria um novo roteador para definir as rotas

// Define as rotas para as operações de linha
router
  .get("/linha", LinhasController.pegarTodasLinhas)
  // Rota para obter todas as linhas. Chamará o método pegarTodasLinhas do controlador LinhasController

  .post("/linha", LinhasController.criaLinha)
  // Rota para criar uma nova linha. Chamará o método criaLinha do controlador LinhasController

  .put("/linha/:id", LinhasController.atualizarLinha)
  // Rota para atualizar uma linha existente. Chamará o método atualizarLinha do controlador LinhasController
  // O ID da linha a ser atualizada é passado como um parâmetro na URL

  .delete("/linha/:id", LinhasController.deletarLinha);
  // Rota para deletar uma linha existente. Chamará o método deletarLinha do controlador LinhasController
  // O ID da linha a ser deletada é passado como um parâmetro na URL

module.exports = router;
// Exporta o roteador para ser utilizado em outros módulos
