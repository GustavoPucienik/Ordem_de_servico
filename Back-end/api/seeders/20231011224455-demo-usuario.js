module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert("Usuarios", [{
    nome: "Gustavo",
    senha: "senha",
    email: "g@gmail.com",
    setor: "Manutenção",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  ], {}),

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete("Usuarios", null, {}),
};
