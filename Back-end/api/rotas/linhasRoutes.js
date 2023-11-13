/* eslint-disable import/extensions */
const express = require("express");
const LinhasController = require("../controllers/linhasController.js");

const router = express.Router();

router
  .get("/linha", LinhasController.pegarTodasLinhas)
  .post("/linha", LinhasController.criaLinha)
  .put("/linha/:id", LinhasController.atualizarLinha)
  .delete("/linha/:id", LinhasController.deletarLinha);

module.exports = router;
