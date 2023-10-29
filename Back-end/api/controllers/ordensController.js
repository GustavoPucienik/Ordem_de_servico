/* eslint-disable class-methods-use-this */
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
          solucao: null,
        },
      });
      return res.status(200).json(todasAsOrdens);
    } catch (error) {
      return res.status(500).json(error.message);
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
