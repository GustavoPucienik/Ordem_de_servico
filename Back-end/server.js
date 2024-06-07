/* eslint-disable import/extensions */
// Desativa a verificação de extensão de importação pelo ESLint

// Carrega as variáveis de ambiente do arquivo .env para process.env
require("dotenv/config");

// Importa a aplicação Express a partir do arquivo app.js localizado na pasta api
const app = require("./api/app.js");

// Define a porta na qual o servidor irá escutar, utilizando a variável de ambiente PORTBACKEND ou, caso não esteja definida, a porta 8000
const port = process.env.PORTBACKEND || 8000;

app.listen(port, () => {// Inicia o servidor e faz com que ele comece a escutar na porta definida
  console.log(`Servidor escutando em http://localhost:${port}`);
  // Exibe uma mensagem no console indicando que o servidor está funcionando e em qual endereço ele pode ser acessado
});
