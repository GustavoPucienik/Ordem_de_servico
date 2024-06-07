const database = require("../models");
// Importa o objeto de modelos do banco de dados

class LinhasController {// Classe controladora para operações relacionadas às linhas

  // Método para criar uma nova linha
  static async criaLinha(req, res) {
    const novaLinha = req.body;
    // Pega os dados da nova linha do corpo da requisição

    try {
      if (Object.keys(novaLinha).length !== 0) {
        // Verifica se o objeto novaLinha não está vazio
        const novaLinhaCriada = await database.linhas.create(novaLinha);
        // Cria a nova linha no banco de dados
        res.status(200).json(novaLinhaCriada);
        // Retorna a nova linha criada com status 200 (OK)
      } else {
        res.status(500).json("Objeto 'novaLinha' não fornecido no corpo da requisição.");
        // Retorna status 500 (Erro do Servidor) se o objeto novaLinha estiver vazio
      }
    } catch (error) {
      res.status(500).json(error.message);
      // Retorna status 500 (Erro do Servidor) com a mensagem de erro
    }
  }

  // Método para pegar todas as linhas
  static async pegarTodasLinhas(req, res) {
    try {
      const todasLinhas = await database.linhas.findAll({
        order: [["nomeDaLinha", "ASC"]],
        // Ordena as linhas em ordem ascendente pelo nomeDaLinha
      });
      res.status(200).json(todasLinhas);
      // Retorna todas as linhas com status 200 (OK)
    } catch (error) {
      res.status(500).json({ error: "Erro ao obter todas as linhas.", details: error.message });
    }
  }

   // Método para atualizar uma linha existente
  static async atualizarLinha(req, res) {
    const { id } = req.params;
    // Pega o ID da linha dos parâmetros da URL
    const novosDados = req.body;
    // Pega os novos dados da linha do corpo da requisição

    try {
      const linhaExistente = await database.linhas.findByPk(id);
      // Busca a linha existente pelo ID

      if (!linhaExistente) {
        return res.status(404).json({ msg: "Linha não encontrada." });
        // Retorna status 404 (Não Encontrado) se a linha não existir
      }

      await linhaExistente.update(novosDados);
      // Atualiza a linha com os novos dados
      return res.status(204).json({ msg: `A linha: ${linhaExistente.nomeDaLinha} foi atualizada.` });
      // Retorna status 204 (Sem Conteúdo) indicando sucesso
    } catch (error) {
      return res.status(500).json({ error: "Erro ao atualizar a linha.", details: error.message });
      // Retorna status 500 (Erro do Servidor) com mensagem de erro detalhada
    }
  }

  // Método para deletar uma linha existente
  static async deletarLinha(req, res) {
    const { id } = req.params;
    // Pega o ID da linha dos parâmetros da URL

    try {
      const linhaExistente = await database.linhas.findOne({ where: { id: Number(id) } });
      // Busca a linha existente pelo ID

      if (!linhaExistente) {
        return res.status(404).json("Linha não encontrada.");
        // Retorna status 404 (Não Encontrado) se a linha não existir
      }

      await linhaExistente.destroy();
      // Deleta a linha
      return res.status(200).json({ message: `A linha: ${linhaExistente.nomeDaLinha} foi excluida.` });
      // Retorna status 200 (OK) com mensagem de sucesso
    } catch (error) {
      return res.status(500).json(error.message);
      // Retorna status 500 (Erro do Servidor) com a mensagem de erro
    }
  }
}

module.exports = LinhasController;
// Exporta a classe LinhasController para ser usada em outros módulos
