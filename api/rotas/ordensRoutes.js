/* eslint-disable import/extensions */
const express = require("express");
const OrdensController = require("../controllers/ordensController.js");

const router = express.Router();

router
  .get("/cadastrarOrdens", OrdensController.cadastrar);

module.exports = router;
