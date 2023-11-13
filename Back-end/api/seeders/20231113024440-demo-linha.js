module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert("linhas", [{
    nomeDaLinha: "Terco 1",
    createdAt: new Date(),
    updatedAt: new Date(),
  }, {
    nomeDaLinha: "Terco 2",
    createdAt: new Date(),
    updatedAt: new Date(),
  }, {
    nomeDaLinha: "Una 1",
    createdAt: new Date(),
    updatedAt: new Date(),
  }, {
    nomeDaLinha: "Una 2",
    createdAt: new Date(),
    updatedAt: new Date(),
  }, {
    nomeDaLinha: "Promaquina",
    createdAt: new Date(),
    updatedAt: new Date(),
  }, {
    nomeDaLinha: "Manual",
    createdAt: new Date(),
    updatedAt: new Date(),
  }], {}),

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete("Ordens", null, {}),
};
