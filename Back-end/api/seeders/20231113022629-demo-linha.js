module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert("linhas", [{
    nomeDalinha: "Terco 1",
    createdAt: new Date(),
    updatedAt: new Date(),
  }, {
    nomeDalinha: "Terco 2",
    createdAt: new Date(),
    updatedAt: new Date(),
  }, {
    nomeDalinha: "Una 1",
    createdAt: new Date(),
    updatedAt: new Date(),
  }, {
    nomeDalinha: "Una 2",
    createdAt: new Date(),
    updatedAt: new Date(),
  }, {
    nomeDalinha: "Promaquina",
    createdAt: new Date(),
    updatedAt: new Date(),
  }, {
    nomeDalinha: "Kalix",
    createdAt: new Date(),
    updatedAt: new Date(),
  }, {
    nomeDalinha: "Bosch",
    createdAt: new Date(),
    updatedAt: new Date(),
  }, {
    nomeDalinha: "Cosméticos",
    createdAt: new Date(),
    updatedAt: new Date(),
  }, {
    nomeDalinha: "Serac",
    createdAt: new Date(),
    updatedAt: new Date(),
  }, {
    nomeDalinha: "Multiuso",
    createdAt: new Date(),
    updatedAt: new Date(),
  }, {
    nomeDalinha: "Dosagem grafite",
    createdAt: new Date(),
    updatedAt: new Date(),
  }, {
    nomeDalinha: "Manual",
    createdAt: new Date(),
    updatedAt: new Date(),
  }], {}),

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete("linhas", null, {}),
};
