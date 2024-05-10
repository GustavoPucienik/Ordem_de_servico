/* eslint-disable no-bitwise */
/* eslint-disable class-methods-use-this */
const jwt = require("jsonwebtoken");
const { hash, compare } = require("bcryptjs");
const database = require("../models");

const jwtSecret = process.env.JWT_SECRET;

class UsuarioController {
  static async logar(req, res) {
    const { email, senha } = req.body;
    try {
      const usuarioquelogou = await database.usuarios.findOne({
        where: {
          email,
        },
      });
      if (!usuarioquelogou || usuarioquelogou === null || usuarioquelogou === undefined) {
        return res.status(200).json({ msg: `Usuario com email ${email} não foi encontrado` });
      }
      const senhasIguais = await compare(senha, usuarioquelogou.senha);

      if (!senhasIguais) {
        return res.status(200).json({ msg: "A senha está incorreta!" });
      }

      const token = jwt.sign({
        id: usuarioquelogou.id,
        nome: usuarioquelogou.nome,
        setor: usuarioquelogou.setor,
        email: usuarioquelogou.email,
      }, jwtSecret, { expiresIn: "2h" });
      return res.status(200).json({ token });
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async cadastrar(req, res) {
    const novoUsuario = req.body;

    try {
      const userExiste = await database.usuarios.findOne({
        where: {
          email: novoUsuario.email,
        },
      });
      if (userExiste) {
        return res.status(200).json({ msg: "O email já está sendo utilizado." });
      }

      const senhaHash = await hash(novoUsuario.senha, 8);

      const novoUsuarioCriado = await database.usuarios.create({
        nome: novoUsuario.nome,
        setor: novoUsuario.setor,
        email: novoUsuario.email,
        senha: senhaHash,
      });
      return res.status(201).json({ nome: novoUsuarioCriado.nome });
    } catch (error) {
      return res.status(500).json({ error: error.message });
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

  static async atualizarSenha(req, res) {
    const { senha, novaSenha, email } = req.body;

    const usuarioquelogou = await database.usuarios.findOne({
      where: {
        email,
      },
    });

    const senhasIguais = await compare(senha, usuarioquelogou.senha);

    if (!senhasIguais) {
      return res.status(200).json({ msg: "A senha está incorreta!" });
    }

    const senhaHash = await hash(novaSenha, 8);

    await database.usuarios.update(
      {
        senha: senhaHash,
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
    return res.status(204).json(dadosUsuario);
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
