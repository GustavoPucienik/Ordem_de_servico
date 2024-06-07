/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable class-methods-use-this */
const { Op } = require("sequelize");
// Importa operadores do Sequelize para operações de consulta
const database = require("../models");
// Importa o objeto de modelos do banco de dados

class OrdensController {
  // Classe controladora para operações relacionadas às ordens
  static async criaOrdem(req, res) {
    // Método para criar uma nova ordem de serviço
    const novaOrdem = req.body;
    // Pega os dados da nova ordem do corpo da requisição
    try {
      if (novaOrdem.nome === "" || novaOrdem.descricao_req === "") {//Verifica se os campos obrigatórios estão preenchidos
        return res.status(200).json({ msgErro: "Sem informações de nome ou descrição para criar ordem" });
        // Retorna status 200 (OK) com mensagem de erro se os campos obrigatórios estiverem vazios
      }

      const novaOrdemCriada = await database.Ordens.create(novaOrdem);
      // Cria a nova ordem no banco de dados

      return res.status(201).json({ novaOrdemCriada, msg: "Ordem de serviço criada com sucesso" });
      // Retorna a nova ordem criada com status 201 (Criado) e mensagem de sucesso
    } catch (error) {
      return res.status(500).json(error.message);
      // Retorna status 500 (Erro do Servidor) com a mensagem de erro
    }
  }

  // Método para mostrar todas as requisições de ordens não concluídas
  static async mostraRequisicoes(req, res) {
    try {
      const todasAsOrdens = await database.Ordens.findAll({
        where: {
          concluida: null,
          // Filtra as ordens que não estão concluídas
        },
        order: [["createdAt", "DESC"]],
        // Ordena as ordens pela data de criação em ordem decrescente
      });
      return res.status(200).json(todasAsOrdens);
      // Retorna todas as ordens não concluídas com status 200 (OK)
    } catch (error) {
      return res.status(500).json(error.message);
      // Retorna status 500 (Erro do Servidor) com a mensagem de erro
    }
  }

  // Método para mostrar todas as ordens concluídas
  static async mostraOrdensConcluidas(req, res) {
    try {
      const todasAsOrdens = await database.Ordens.findAll({
        where: {
          concluida: true,
          // Filtra as ordens que estão concluídas
        },
        order: [["createdAt", "DESC"]],
        // Ordena as ordens pela data de criação em ordem decrescente
        limit: 10,
        // Limita o resultado a 10 ordens
      });
      return res.status(200).json(todasAsOrdens);
      // Retorna todas as ordens concluídas com status 200 (OK)
    } catch (error) {
      return res.status(500).json(error.message);
      // Retorna status 500 (Erro do Servidor) com a mensagem de erro
    }
  }

  // Método para filtrar ordens concluídas com base em parâmetros fornecidos
  static async filtrarOrdensConcluidas(req, res) {
    const {
      filtroName, filtroSetor, filtroLinha, filtroDataInicio, filtroDataFim,
    } = req.query;// Pega os filtros dos parâmetros de consulta da URL
    
    try {
      // Usa o operador Sequelize 'like' para filtrar
      const ordensFiltradas = await database.Ordens.findAll({
        where: {
          concluida: true,
          // Filtra as ordens que estão concluídas
          [Op.and]: [
            {
              usuario_req: {
                [Op.like]: `%${filtroName}%`,
                // Filtra pelo nome do usuário requisitante
              },
            },
            {
              setor: {
                [Op.like]: `%${filtroSetor}%`,
                // Filtra pelo setor
              },
            },
            {
              linha: {
                [Op.like]: `%${filtroLinha}%`,
                // Filtra pela linha
              },
            },
            {
              createdAt: {
                [Op.gte]: new Date(filtroDataInicio),
                // Filtra pela data de início
              },
            },
            {
              createdAt: {
                [Op.lte]: new Date(filtroDataFim),
                // Filtra pela data de termino
              },
            },
            // Adicionei outras colunas aqui, se necessário
          ],
        },
        order: [["updatedAt", "DESC"]],
        // Ordena as ordens pela data de atualização em ordem decrescente
      });

      res.json(ordensFiltradas);
      // Retorna as ordens filtradas
    } catch (error) {
      res.status(500).json({ error: "Erro ao buscar ordens" });
      // Retorna status 500 (Erro do Servidor) com mensagem de erro
    }
  }

  // Método para pegar uma ordem específica pelo ID
  static async pegaOrdem(req, res) {
    try {
      const { id } = req.params;
      // Pega o ID da ordem dos parâmetros da URL
      const ordem = await database.Ordens.findOne({ where: { id: Number(id) } });
      // Busca a ordem pelo ID
      return res.status(200).json(ordem);
      // Retorna a ordem encontrada com status 200 (OK)
    } catch (error) {
      return res.status(500).json(error.message);
      // Retorna status 500 (Erro do Servidor) com a mensagem de erro
    }
  }

  // Método para atualizar uma ordem específica pelo ID
  static async atualizaOrdem(req, res) {
    const { id } = req.params;
    // Pega o ID da ordem dos parâmetros da URL
    const novasInfos = req.body;
    // Pega os novos dados da ordem do corpo da requisição
    try {
      novasInfos.updatedAt = new Date();
      // Define a data de atualização como a data atual
      await database.Ordens.update(novasInfos, { where: { id: Number(id) } });
      // Atualiza a ordem com os novos dados
      const ordemAtualizada = await database.Ordens.findOne({ where: { id: Number(id) } });
      // Busca a ordem atualizada pelo ID
      return res.status(204).json(ordemAtualizada);
      // Retorna a ordem atualizada com status 204 (Sem Conteúdo) indicando sucesso
    } catch (error) {
      return res.status(500).json(error.message);
      // Retorna status 500 (Erro do Servidor) com a mensagem de erro
    }
  }

  // Método para deletar uma ordem específica pelo ID
  static async deletaOrdem(req, res) {
    const { id } = req.params;
    // Pega o ID da ordem dos parâmetros da URL
    try {
      await database.Ordens.destroy({
        where: {
          id: Number(id),
          // Filtra pela ordem com o ID especificado
        },
      });
      return res.status(200).json({ mensagem: `A ordem com id:${id} foi deletado` });
      // Retorna status 200 (OK) com mensagem de sucesso
    } catch (error) {
      return res.status(500).json(error.message);
      // Retorna status 500 (Erro do Servidor) com a mensagem de erro
    }
  }
}

module.exports = OrdensController;
// Exporta a classe OrdensController para ser usada em outros módulos
