module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert("Usuarios", [{
    nome: "Ana Souza",
    senha: "qwerty",
    setor: "Almoxarifado",
    tipo: "0",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    nome: "Joao",
    senha: "qwerty",
    setor: "Expedicao",
    tipo: "0",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  ], {}),

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete("Usuarios", null, {}),
};
