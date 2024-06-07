# Sistema que desenvolvi para a empresa Ap Winner

## Sobre o projeto
Este sistema foi desenvolvido para simplificar o gerenciamento de ordens de serviço para o setor de manutenção.

## Tecnologias utilizadas
- **node**: Ambiente de execução javascript.
- **React**: Frameworks para desenvolver aplicação javascript.
- **mysql**: Banco de dados relacional.

## Principais bibliotecas
- **Express**: Framework web rápido, flexível e minimalista para criação de API Node.js.
- **axios**: Cliente HTTP baseado em Promises para fazer requisições HTTP tanto no navegador quanto no Node.js.
- **body-parser**: Middleware para analisar corpos de requisição em Node.js.
- **cors**: Middleware para habilitar o Cross-Origin Resource Sharing (CORS) em Express.
- **dotenv**: Carrega variáveis de ambiente de um arquivo `.env` para o `process.env`.
- **bcryptjs**: Biblioteca para criptografia em JavaScript.
- **jsonwebtoken**: Implementação de JSON Web Tokens (JWT) para Node.js.
- **mysql2**: Conector MySQL para Node.js que promove desempenho e escalabilidade.
- **sequelize**: ORM (Object-Relational Mapping) Node.js para suporte a MySQL, PostgreSQL, SQLite e outros.
- **sequelize-cli**: Interface de linha de comando para Sequelize, facilitando a criação e gerenciamento de modelos e migrações.
- **xlsx**: Biblioteca para ler e escrever arquivos do Excel em JavaScript.
- **date-fns**: Biblioteca moderna para manipulação de datas em JavaScript.
- **react-dom**: Pacote do ReactDOM para manipulação do DOM em aplicações React.
- **react-router-dom**: Pacote React Router para roteamento em aplicações React.
- **web-vitals**: Biblioteca para medir e rastrear métricas de desempenho de uma página da web.
- **path**: Utilitário que fornece utilitários para trabalhar com caminhos de arquivo e diretório.
- **eslist**: Ferramenta de análise de código estática para identificar padrões problemáticos e corrigir identação do código JavaScript.

## Passo a passo para rodar localmente

### Para instalar as dependencias
1. Entre com o terminal do node na pasta Back-end
2. Execute o comando "npm install"
3. Entre com o terminal do node na pasta ordem-de-servico
4. Execute o comando "npm install"

### Definir porta da aplicação frontend nos seguintes arquivos
1. ordem-de-servico/.env

### Definir porta da api nos seguintes arquivos
1. ordem-de-servico/package-lock.json
2. ordem-de-servico/src/config/index.js
3. Back-end/.env

### Definir banco de dados no seguinte arquivo
- Back-end/api/config/config.json

### Popular o banco de dados
1. Crie o banco de dados com nome ordemservico
2. Entre com o terminal do node na pasta Back-end
3. Execute o comando "npx sequelize-cli db:migrate"
4. Execute o comando "npx sequelize-cli db:seed:all"

### Iniciando a API e a aplicação front-end
1. Entre com o terminal do node na pasta Back-end
2. Execute o comando "npm run start"
3. Entre com o terminal do node na pasta ordem-de-servico
4. Execute o comando "npm run start"

## Estrutura do projeto
ordem-de-servico/

├── public/ 

├── src/

────└─ components/

────└─ config/

────└─ img/

────└─ App.js

────└─ index.js

└── .env


Back-end/

├── api/                #Código fonte da API

────└─ config/         #Configuração do banco de dados

────└─ controllers/    #Função dos controles das rotas

────└─ migrations/     #Arquivos de migração dos dados

────└─ models/         #Modelos dos dados

────└─ rotas/          #Definição das rotas da API

────└─ seeders/        #Arquivo para semear os dados

────└─ app.js

├── .env

└── server.js


# Endpoints da API:

## Rota de usuarios

### Login de usuário
- URL:/login
- Método: POST
- Descrição: autentica um usuário e retorna um token JWT
- corpo da requisição: 
{
  "email": "usuario@example.com",
  "senha": "senha"
}

### Cadastro de usuário
- URL: /cadastrar
- Método: POST
- Descrição: Cadastra um novo usuário
- Corpo da requisição:
{
  "nome": "Nome do Usuário",
  "email": "usuario@example.com",
  "senha": "senha",
  "setor": "Setor do Usuário"
}

### Pegar dados do usuário
- URL: /dadosusuario
- Método: GET
- Descrição: Retorna os dados do usuário autenticado
- Cabeçalho da requisição: um Bearer Token criado no momento do login

### Atualizar senha do usuário
- URL: /dadosusuario
- Método: PUT
- Descrição: Atualiza a senha do usuário autenticado
- Corpo da requisição:
{
  "senha": "senha_atual",
  "novaSenha": "nova_senha"
}

### Deletar usuário
- URL: /usuario/:id
- Método: DELETE
- Descrição: Deleta um usuário pelo ID
- Parâmetros da URL:
id (integer, obrigatório): ID do usuário


## Rota das ordens

### Pegar ordens em aberto
- URL: /ordens
- Método: GET
- Descrição: Retorna todas as ordens de serviço pendentes

### Pegar Ordem de Serviço
- URL: /ordens/:id
- Método: GET
- Descrição: Retorna uma ordem de serviço específica pelo ID
- Parâmetros da URL:
id (integer, obrigatório): ID da ordem de serviço

### Mostrar Ordens de Serviço Concluídas
- URL: /ordensconcluidas
- Método: GET
- Descrição: Retorna as últimas 10 ordens de serviço concluídas

### Filtrar Ordens de Serviço Concluídas
- URL: /filtrarordensconcluidas
- Método: GET
- Descrição: Filtra as ordens de serviço concluídas com base nos parâmetros fornecidos
- Parâmetros da URL:
filtroName: Nome do usuário requisitante
filtroSetor: Setor do usuário requisitante
filtroLinha: Linha de produção relacionada à ordem
filtroDataInicio: Data de início do filtro (formato: YYYY-MM-DD)
filtroDataFim: Data de fim do filtro (formato: YYYY-MM-DD)

### Criar Ordem de Serviço
- URL: /ordens
- Método: POST
- Descrição: Cria uma nova ordem de serviço
- Corpo da requisição:
{
  "nome": "Nome da Ordem",
  "descricao_req": "Descrição da Ordem"
}

### Atualizar Ordem de Serviço
- URL: /ordens/:id
- Método: PUT
- Descrição: Atualiza uma ordem de serviço existente pelo ID
- Parâmetros da URL:
id (integer, obrigatório): ID da ordem de serviço
- Corpo da requisição:
{
    tipo_servico: "",
    inicio: "",
    termino: "",
    tempo: "",
    parada_maquina: "",
    mecanicos: "",
    item_defeito: "",
    problema: "",
    solucao: "",
    concluida: ""
}

### Deletar Ordem de Serviço
- URL: /ordens/:id
- Método: DELETE
- Descrição: Deleta uma ordem de serviço pelo ID
- Parâmetros da URL:
id (integer, obrigatório): ID da ordem de serviço


## Rotas das linhas de produção

### Adicionar nova linha de produção
- URL: /linha
- Método: POST
- Descrição: Cria uma nova linha de produção
- Corpo da requisição:
{
  "nomeDaLinha": "Nome da Linha de Produção",
  "descricao": "Descrição da Linha de Produção"
}

### Pegar Todas as Linhas de Produção
- URL: /linha
- Método: GET
- Descrição: Retorna todas as linhas de produção
- Parâmetros da URL: Nenhum

### Atualizar Linha de Produção
- URL: /linha/:id
- Método: PUT
- Descrição: Atualiza uma linha de produção existente pelo ID
- Parâmetros da URL:
id (integer, obrigatório): ID da linha de produção
- Corpo da requisição:
{
  "nomeDaLinha": "Novo nome da linha de produção",
  "descricao": "Nova descrição da linha de produção"
}

### Deletar Linha de Produção
- URL: /linha/
- Método: DELETE
- Descrição: Deleta uma linha de produção pelo ID
- Parâmetros da URL:
id (integer, obrigatório): ID da linha de produção