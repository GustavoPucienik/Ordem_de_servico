# Use a imagem oficial do Node.js como base
FROM node:latest

# Define o diretório de trabalho dentro do container
WORKDIR /app

# Copia os arquivos de dependências do backend e instala as dependências
COPY ./Back-end/package*.json ./Back-end/
RUN cd Back-end && npm install

# Copia os arquivos de dependências do frontend e instala as dependências
COPY ./ordem-de-servico/package*.json ./ordem-de-servico/
RUN cd ordem-de-servico && npm install

# Copia o código-fonte do backend para o diretório de trabalho
COPY ./Back-end ./Back-end

# Copia o código-fonte do frontend para o diretório de trabalho
COPY ./ordem-de-servico ./ordem-de-servico

# Exponha as portas necessárias
EXPOSE 3030
EXPOSE 3031

# Comando para iniciar o servidor backend
CMD ["npm", "start", "--prefix", "Back-end"]

# Você pode adicionar um comando para iniciar o servidor frontend também, se desejar
