module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable("Ordens", {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    usuario_req: {
      allowNull: false,
      type: Sequelize.STRING,
    },
    setor: {
      allowNull: false,
      type: Sequelize.STRING,
    },
    data_req: {
      type: Sequelize.DATE,
    },
    descricao_req: {
      allowNull: false,
      type: Sequelize.STRING,
    },
    linha: {
      type: Sequelize.STRING,
    },
    tipo_servico: {
      type: Sequelize.STRING,
    },
    mecanicos: {
      type: Sequelize.STRING,
    },
    inicio: {
      type: Sequelize.DATE,
    },
    termino: {
      type: Sequelize.DATE,
    },
    tempo: {
      type: Sequelize.TIME,
    },
    parada_maquina: {
      type: Sequelize.TIME,
    },
    item_defeito: {
      type: Sequelize.STRING,
    },
    problema: {
      type: Sequelize.STRING,
    },
    solucao: {
      type: Sequelize.STRING,
    },
    mecanicoQresolveu: {
      type: Sequelize.STRING,
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
  }),
  down: (queryInterface, Sequelize) => queryInterface.dropTable("Ordens"),
};
