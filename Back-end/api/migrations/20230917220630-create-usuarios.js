module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable("Usuarios", {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    nome: {
      type: Sequelize.STRING,
    },
    senha: {
      type: Sequelize.STRING,
    },
    setor: {
      type: Sequelize.STRING,
    },
    tipo: {
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
  down: (queryInterface, Sequelize) => queryInterface.dropTable("Usuarios"),
};
