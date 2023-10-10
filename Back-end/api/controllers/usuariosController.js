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

  static async cadastrar(req, res) {
    const novoUsuario = req.body;
    try {
      const novoUsuarioCriado = await database.Usuarios.create(novoUsuario);
      return res.status(201).json(novoUsuarioCriado);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static deletarUsuario(req, res) {
    try {
      //
    } catch (error) {
      //
    }
  }
}

module.exports = UsuarioController;
