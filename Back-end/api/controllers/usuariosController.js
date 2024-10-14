/* eslint-disable no-bitwise */
/* eslint-disable class-methods-use-this */
const jwt = require("jsonwebtoken");
// Importa a biblioteca JSON Web Token para criação e verificação de tokens JWT
const { hash, compare } = require("bcryptjs");
// Importa funções de hash e comparação da biblioteca bcryptjs para criptografia de senhas
const database = require("../models");
// Importa o objeto de modelos do banco de dados

const jwtSecret = process.env.JWT_SECRET;
// Obtém o segredo do JWT das variáveis de ambiente

class UsuarioController {
  // Classe controladora para operações relacionadas aos usuários

  // Método para login do usuário
  static async logar(req, res) {
    const { email, senha } = req.body;
    // Pega o email e a senha do corpo da requisição
    try {
      const usuarioquelogou = await database.usuarios.findOne({
        where: {
          email,
          // Busca um usuário com o email fornecido
        },
      });
      if (!usuarioquelogou || usuarioquelogou === null || usuarioquelogou === undefined) {
        // Verifica se o usuário foi encontrado
        return res.status(200).json({ msg: `Usuario com email ${email} não foi encontrado` });
        // Retorna status 200 (OK) com mensagem de erro se o usuário não foi encontrado
      }
      const senhasIguais = await compare(senha, usuarioquelogou.senha);
      // Compara a senha fornecida com a senha armazenada no banco de dados

      if (!senhasIguais) {
        // Verifica se as senhas correspondem
        return res.status(200).json({ msg: "A senha está incorreta!" });
        // Retorna status 200 (OK) com mensagem de erro se as senhas não correspondem
      }

      const token = jwt.sign({
        id: usuarioquelogou.id,
        nome: usuarioquelogou.nome,
        setor: usuarioquelogou.setor,
        email: usuarioquelogou.email,
      }, jwtSecret);
      // Cria um token JWT com os dados do usuário e uma validade de 2 horas

      return res.status(200).json({ token });
      // Retorna o token gerado com status 200 (OK)
    } catch (error) {
      return res.status(500).json(error.message);
      // Retorna status 500 (Erro do Servidor) com a mensagem de erro
    }
  }

  // Método para cadastrar um novo usuário
  static async cadastrar(req, res) {
    const novoUsuario = req.body;
    // Pega os dados do novo usuário do corpo da requisição

    try {
      const userExiste = await database.usuarios.findOne({
        where: {
          email: novoUsuario.email,
          // Verifica se já existe um usuário com o email fornecido
        },
      });
      if (userExiste) {
        // Verifica se o usuário já existe
        return res.status(200).json({ msg: "O email já está sendo utilizado." });
        // Retorna status 200 (OK) com mensagem de erro se o email já está em uso
      }

      const senhaHash = await hash(novoUsuario.senha, 8);
      // Cria um hash da senha fornecida

      const novoUsuarioCriado = await database.usuarios.create({
        nome: novoUsuario.nome,
        setor: novoUsuario.setor,
        email: novoUsuario.email,
        senha: senhaHash,
        // Cria um novo usuário com os dados fornecidos e a senha criptografada
      });
      return res.status(201).json({ nome: novoUsuarioCriado.nome });
      // Retorna o nome do novo usuário criado com status 201 (Criado)
    } catch (error) {
      return res.status(500).json({ error: error.message });
      // Retorna status 500 (Erro do Servidor) com a mensagem de erro
    }
  }

  // Método para obter os dados do usuário a partir do token JWT
  static async pegaDadosUsuario(req, res) {
    const bearerHeader = req.headers.authorization;
    // Obtém o token de autorização do cabeçalho da requisição

    if (typeof bearerHeader !== "undefined") {
      // Verifica se o token foi fornecido
      const bearerToken = bearerHeader.split(" ")[1];
      // Extrai o token da string "Bearer <token>"

      try {
        const decoded = jwt.verify(bearerToken, process.env.JWT_SECRET);
        // Decodifica o token JWT usando o segredo

        const dadosUsuario = await database.usuarios.findOne({
          where: {
            email: decoded.email,
          // Busca os dados do usuário pelo email decodificado do token
          },
        });
        return res.status(200).json(dadosUsuario);
        // Retorna os dados do usuário com status 200 (OK)
      } catch (err) {
        return res.status(401).json({ error: "Token inválido" });
        // Retorna status 401 (Não Autorizado) se o token for inválido
      }
    } else {
      return res.status(401).json({ error: "Token não fornecido" });
      // Retorna status 401 (Não Autorizado) se o token não foi fornecido
    }
  }

  // Método para atualizar a senha do usuário
  static async atualizarSenha(req, res) {
    const { senha, novaSenha, email } = req.body;
    // Pega a senha atual, a nova senha e o email do corpo da requisição

    const usuarioquelogou = await database.usuarios.findOne({
      where: {
        email,
        // Busca um usuário com o email fornecido
      },
    });

    const senhasIguais = await compare(senha, usuarioquelogou.senha);
    // Compara a senha fornecida com a senha armazenada no banco de dados

    if (!senhasIguais) {
      // Verifica se as senhas correspondem
      return res.status(200).json({ msg: "A senha está incorreta!" });
      // Retorna status 200 (OK) com mensagem de erro se as senhas não correspondem
    }

    const senhaHash = await hash(novaSenha, 8);
    // Cria um hash da nova senha fornecida

    await database.usuarios.update(
      {
        senha: senhaHash,
      },
      {
        where: {
          email,
        },
      },
    );// Atualiza a senha do usuário com a nova senha criptografada

    const dadosUsuario = await database.usuarios.findOne({
      where: {
        email,
      // Busca os dados do usuário atualizado
      },
    });
    return res.status(204).json(dadosUsuario);
    // Retorna os dados do usuário atualizado com status 204 (Sem Conteúdo)
  }

  // Método para deletar um usuário pelo ID
  static async deletarUsuario(req, res) {
    const { id } = req.params;
    // Pega o ID do usuário dos parâmetros da URL
    try {
      await database.usuarios.destroy({
        where: {
          id: Number(id),
          // Deleta o usuário com o ID especificado
        },
      });
      return res.status(200).json(`Usuario com ${id} foi deletado.`);
      // Retorna status 200 (OK) com mensagem de sucesso
    } catch (error) {
      return res.status(500).json(error.message);
      // Retorna status 500 (Erro do Servidor) com a mensagem de erro
    }
  }
}

module.exports = UsuarioController;
// Exporta a classe UsuarioController para ser usada em outros módulos
