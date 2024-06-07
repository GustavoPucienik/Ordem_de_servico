/* eslint-disable import/extensions */
const express = require("express");
// Importa o framework Express para a criação de servidores HTTP
const usuarios = require("./usuariosRoutes.js");
// Importa as rotas do módulo de usuários
const ordens = require("./ordensRoutes.js");
// Importa as rotas do módulo de ordens
const linhas = require("./linhasRoutes.js");
// Importa as rotas do módulo de linhas

const routes = (app) => {
  // Função que configura todas as rotas da aplicação
  app.route("/").get((req, res) => {
    // Define uma rota raiz para a página inicial
    res.status(200).send("Pagina Home");
    // Responde com um status 200 e a mensagem "Pagina Home"
  });

  app.use(
    express.json(),
    // Usa o middleware express.json() para habilitar o parsing de JSON no corpo das requisições

    usuarios,
    // Usa as rotas do módulo de usuários
    ordens,
    // Usa as rotas do módulo de ordens
    linhas,
    // Usa as rotas do módulo de linhas
  );
};

// Exporta a função de configuração de rotas para ser usada em outras partes da aplicação
module.exports = routes;
