/* eslint-disable class-methods-use-this */
const database = require("../models");

class UsuarioController {
  static async logar(req, res) {
    try {
      const todasAsPessoas = { mensagem: "Pagina de login" };
      return res.status(200).json(todasAsPessoas);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static cadastrar(req, res) {
    try {
      const cadastrar = { mensagem: "Pagina de cadastro" };
      return res.status(200).json(cadastrar);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }
}

module.exports = UsuarioController;
