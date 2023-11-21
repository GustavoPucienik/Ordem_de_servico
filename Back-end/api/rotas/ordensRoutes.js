/* eslint-disable import/extensions */
const express = require("express");
const OrdensController = require("../controllers/ordensController.js");

const router = express.Router();

router
  .get("/ordens", OrdensController.mostraRequisicoes)
  .get("/ordens/:id", OrdensController.pegaOrdem)
  .get("/ordensconcluidas", OrdensController.mostraOrdensConcluidas)
  .get("/filtrarordensconcluidas", OrdensController.filtrarOrdensConcluidas)
  .post("/ordens", OrdensController.criaOrdem)
  .put("/ordens/:id", OrdensController.atualizaOrdem)
  .delete("/ordens/:id", OrdensController.deletaOrdem);

module.exports = router;
