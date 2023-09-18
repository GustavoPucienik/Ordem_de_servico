/* eslint-disable class-methods-use-this */
const database = require("../models");

class OrdensController {
  static cadastrar(req, res) {
    try {
      const cadastra = { mensagem: "Pagina para criar ordens de serviço." };
      return res.status(200).json(cadastra);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async mostraOrdens(req, res) {
    try {
      const todasAsOrdens = await database.Ordens.findAll();
      return res.status(200).json(todasAsOrdens);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }
}

module.exports = OrdensController;
