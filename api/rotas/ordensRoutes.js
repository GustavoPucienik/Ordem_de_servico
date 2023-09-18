/* eslint-disable import/extensions */
const express = require("express");
const OrdensController = require("../controllers/ordensController.js");

const router = express.Router();

router
  .get("/ordens", OrdensController.mostraOrdens)
  .post("/cadastrarOrdens", OrdensController.cadastrar);

module.exports = router;
