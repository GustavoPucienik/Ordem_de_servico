/* eslint-disable no-bitwise */
/* eslint-disable class-methods-use-this */
const jwt = require("jsonwebtoken");
const database = require("../models");

const jwtSecret = process.env.JWT_SECRET;

class UsuarioController {
  static async logar(req, res) {
    const { email, senha } = req.body;
    try {
      const usuarioquelogou = await database.usuarios.findOne({
        where: {
          email,
          senha,
        },
      });
      if (!usuarioquelogou || usuarioquelogou === null || usuarioquelogou === undefined) {
        return res.status(200).json({ message: "Usuario não encontrado ou a senha ou email estão incorretos." });
      }
      const token = jwt.sign({ email: usuarioquelogou.email, senha: usuarioquelogou.senha, id: usuarioquelogou.id }, jwtSecret, { expiresIn: "1h" });
      return res.status(200).json({ usuario: usuarioquelogou, token });
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async cadastrar(req, res) {
    const novoUsuario = req.body;
    const userExiste = await database.usuarios.findOne({
      where: {
        email: novoUsuario.email,
      },
    });
    if (userExiste) {
      return res.status(200).json({ msg: "O email já está sendo utilizado." });
    }
    try {
      const novoUsuarioCriado = await database.usuarios.create(novoUsuario);
      return res.status(201).json(novoUsuarioCriado);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async pegaDadosUsuario(req, res) {
    const bearerHeader = req.headers.authorization;

    if (typeof bearerHeader !== "undefined") {
      const bearerToken = bearerHeader.split(" ")[1];

      try {
        const decoded = jwt.verify(bearerToken, process.env.JWT_SECRET);
        const dadosUsuario = await database.usuarios.findOne({
          where: {
            email: decoded.email,
            senha: decoded.senha,
          },
        });
        return res.status(200).json(dadosUsuario);
      } catch (err) {
        return res.status(401).json({ error: "Token inválido" });
      }
    } else {
      return res.status(401).json({ error: "Token não fornecido" });
    }
  }

  static async atualizarUsuario(req, res) {
    const { nome, setor, email } = req.body;

    await database.usuarios.update(
      {
        nome,
        setor,
      },
      {
        where: {
          email,
        },
      },
    );
    const dadosUsuario = await database.usuarios.findOne({
      where: {
        email,
      },
    });
    res.status(200).json(dadosUsuario);
  }

  static async deletarUsuario(req, res) {
    const { id } = req.params;
    try {
      await database.usuarios.destroy({
        where: {
          id: Number(id),
        },
      });
      return res.status(200).json(`Usuario com ${id} foi deletado.`);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }
}

module.exports = UsuarioController;
