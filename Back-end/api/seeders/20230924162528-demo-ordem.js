module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert("Ordens", [{
    data_req: new Date(),
    descricao_req: "string",
    linha: "string",
    tipo_servico: "string",
    mecanicos: "string",
    inicio: "date",
    termino: "date",
    tempo: "time",
    parada_maquina: "time",
    item_defeito: "string",
    problema: "string",
    solucao: "string",
    usu_update_req: "string",
    createdAt: new Date(),
    updatedAt: new Date(),
  }], {}),

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete("Ordens", null, {}),
};
