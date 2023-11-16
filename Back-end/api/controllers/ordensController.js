/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable class-methods-use-this */
const { Op } = require("sequelize");
const database = require("../models");

class OrdensController {
  static async criaOrdem(req, res) {
    const novaOrdem = req.body;
    try {
      const novaOrdemCriada = await database.Ordens.create(novaOrdem);
      return res.status(201).json(novaOrdemCriada);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async mostraRequisicoes(req, res) {
    try {
      const todasAsOrdens = await database.Ordens.findAll({
        where: {
          concluida: null,
        },
        order: [["createdAt", "DESC"]],
      });
      return res.status(200).json(todasAsOrdens);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async mostraOrdensConcluidas(req, res) {
    try {
      const todasAsOrdens = await database.Ordens.findAll({
        where: {
          concluida: true,
        },
        order: [["createdAt", "DESC"]], // Ordena por data de atualização em ordem decrescente
        limit: 10,
      });
      return res.status(200).json(todasAsOrdens);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async filtrarOrdensConcluidas(req, res) {
    const {
      filtroName, filtroSetor, filtroLinha, filtroDataInicio, filtroDataFim,
    } = req.query;
    try {
      // Usei o operador Sequelize 'like' para filtrar
      const ordensFiltradas = await database.Ordens.findAll({
        where: {
          concluida: true,
          [Op.and]: [
            {
              usuario_req: {
                [Op.like]: `%${filtroName}%`,
              },
            },
            {
              setor: {
                [Op.like]: `%${filtroSetor}%`,
              },
            },
            {
              linha: {
                [Op.like]: `%${filtroLinha}%`,
              },
            },
            {
              createdAt: {
                [Op.gte]: new Date(filtroDataInicio),
              },
            },
            {
              createdAt: {
                [Op.lte]: new Date(filtroDataFim),
              },
            },
            // Adicionei outras colunas aqui, se necessário
          ],
        },
        order: [["updatedAt", "DESC"]],
      });

      res.json(ordensFiltradas);
    } catch (error) {
      res.status(500).json({ error: "Erro ao buscar ordens" });
    }
  }

  static async pegaOrdem(req, res) {
    try {
      const { id } = req.params;
      const ordem = await database.Ordens.findOne({ where: { id: Number(id) } });
      return res.status(200).json(ordem);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async atualizaOrdem(req, res) {
    const { id } = req.params;
    const novasInfos = req.body;
    try {
      novasInfos.updatedAt = new Date();
      await database.Ordens.update(novasInfos, { where: { id: Number(id) } });
      const ordemAtualizada = await database.Ordens.findOne({ where: { id: Number(id) } });
      return res.status(200).json(ordemAtualizada);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async deletaOrdem(req, res) {
    const { id } = req.params;
    try {
      await database.Ordens.destroy({
        where: {
          id: Number(id),
        },
      });
      return res.status(200).json({ mensagem: `A ordem com id:${id} foi deletado` });
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }
}

module.exports = OrdensController;
