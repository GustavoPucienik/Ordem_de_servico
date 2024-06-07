/* eslint-disable import/extensions */
const express = require("express");
// Importa o framework Express para a criação de servidores HTTP
const OrdensController = require("../controllers/ordensController.js");
// Importa o controlador de ordens, que contém a lógica de negócios para as operações de ordens

const router = express.Router();

router
  .get("/ordens", OrdensController.mostraRequisicoes)
  // Rota para obter todas as ordens não concluídas. Chamará o método mostraRequisicoes do controlador OrdensController

  .get("/ordens/:id", OrdensController.pegaOrdem)
  // Rota para obter uma ordem específica pelo ID. Chamará o método pegaOrdem do controlador OrdensController

  .get("/ordensconcluidas", OrdensController.mostraOrdensConcluidas)
  // Rota para obter todas as ordens concluídas. Chamará o método mostraOrdensConcluidas do controlador OrdensController

  .get("/filtrarordensconcluidas", OrdensController.filtrarOrdensConcluidas)
  // Rota para filtrar ordens concluídas com base em critérios específicos. Chamará o método filtrarOrdensConcluidas do controlador OrdensController

  .post("/ordens", OrdensController.criaOrdem)
  // Rota para criar uma nova ordem. Chamará o método criaOrdem do controlador OrdensController

  .put("/ordens/:id", OrdensController.atualizaOrdem)
  // Rota para atualizar uma ordem existente pelo ID. Chamará o método atualizaOrdem do controlador OrdensController

  .delete("/ordens/:id", OrdensController.deletaOrdem);
  // Rota para deletar uma ordem existente pelo ID. Chamará o método deletaOrdem do controlador OrdensController

module.exports = router;
// Exporta o roteador para ser utilizado em outros módulos
