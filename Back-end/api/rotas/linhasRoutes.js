/* eslint-disable import/extensions */
const express = require("express");
const LinhasController = require("../controllers/linhasController.js");

const router = express.Router();

router
  .post("/linha", LinhasController.criaLinha)
  .delete("/linha/:id", LinhasController.deletarLinha);

module.exports = router;
