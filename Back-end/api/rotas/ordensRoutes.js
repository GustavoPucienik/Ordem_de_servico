/* eslint-disable import/extensions */
const express = require("express");
const OrdensController = require("../controllers/ordensController.js");

const router = express.Router();

router
  .get("/ordens", OrdensController.mostraOrdens)
  .get("/ordens/:id", OrdensController.pegaOrdem)
  .post("/ordens/criar", OrdensController.criaOrdem)
  .put("/ordens/:id", OrdensController.atualizaOrdem)
  .delete("/ordens/:id", OrdensController.deletaOrdem);

module.exports = router;
