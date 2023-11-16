const database = require("../models");

class LinhasController {
  static async criaLinha(req, res) {
    const novaLinha = req.body;

    try {
      if (Object.keys(novaLinha).length !== 0) {
        const novaLinhaCriada = await database.linhas.create(novaLinha);
        res.status(200).json(novaLinhaCriada);
      } else {
        res.status(500).json("Objeto 'novaLinha' não fornecido no corpo da requisição.");
      }
    } catch (error) {
      res.status(500).json(error.message);
    }
  }

  static async pegarTodasLinhas(req, res) {
    try {
      const todasLinhas = await database.linhas.findAll({
        order: [["nomeDaLinha", "ASC"]],
      });
      res.status(200).json(todasLinhas);
    } catch (error) {
      res.status(500).json({ error: "Erro ao obter todas as linhas.", details: error.message });
    }
  }

  static async atualizarLinha(req, res) {
    const { id } = req.params;
    const novosDados = req.body;

    try {
      const linhaExistente = await database.linhas.findByPk(id);

      if (!linhaExistente) {
        return res.status(404).json({ error: "Linha não encontrada." });
      }

      await linhaExistente.update(novosDados);
      return res.status(200).json({ message: `A linha: ${linhaExistente.nomeDaLinha} foi atualizada.` });
    } catch (error) {
      return res.status(500).json({ error: "Erro ao atualizar a linha.", details: error.message });
    }
  }

  static async deletarLinha(req, res) {
    const { id } = req.params; // Assume que o ID é passado como um parâmetro na URL

    try {
      const linhaExistente = await database.linhas.findOne({ where: { id: Number(id) } });

      if (!linhaExistente) {
        return res.status(404).json("Linha não encontrada.");
      }

      await linhaExistente.destroy();
      return res.status(200).json({ message: `A linha: ${linhaExistente.nomeDaLinha} foi excluida.` }); // Retorna status 204 (No Content) indicando sucesso sem conteúdo.
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }
}

module.exports = LinhasController;
