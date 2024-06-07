/* eslint-disable import/extensions */
/* eslint-disable import/no-extraneous-dependencies */

require("dotenv/config");
// Carrega as variáveis de ambiente do arquivo .env para process.env

const express = require("express");
// Importa o módulo Express

const cors = require("cors");
// Importa o módulo CORS para permitir o compartilhamento de recursos entre diferentes origens

const bodyParser = require("body-parser");
// Importa o módulo body-parser para analisar os corpos das requisições

const routes = require("./rotas/index.js");
// Importa o módulo de rotas a partir do arquivo index.js localizado na pasta rotas

const app = express();
// Cria uma instância da aplicação Express

// Configure o CORS com opções mais restritivas
const corsOptions = {
  origin: "*", // Permite qualquer origem. Substitua pelo domínio do seu frontend em produção para maior segurança
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE", // Métodos HTTP permitidos
  allowedHeaders: "Content-Type,Authorization", // Cabeçalhos permitidos
};

app.use(cors(corsOptions));// Aplica o middleware CORS com as opções configuradas
app.use(bodyParser.json());// Aplica o middleware body-parser para analisar corpos das requisições JSON
routes(app);// Aplica as rotas definidas no módulo de rotas à aplicação Express

module.exports = app;
// Exporta a instância da aplicação Express para ser usada em outros módulos
