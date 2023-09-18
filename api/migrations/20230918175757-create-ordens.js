module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable("Ordens", {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    dataReq: {
      type: Sequelize.DATE,
    },
    descricaoReq: {
      type: Sequelize.STRING,
    },
    tipoServico: {
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
    paradaMaquina: {
      type: Sequelize.TIME,
    },
    itemDefeituoso: {
      type: Sequelize.STRING,
    },
    problema: {
      type: Sequelize.STRING,
    },
    solucao: {
      type: Sequelize.STRING,
    },
    tecnico: {
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
