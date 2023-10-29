module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert("Ordens", [{
    usuario_req: "G",
    setor: "Manutenção",
    data_req: new Date(),
    descricao_req: "Máquina parou",
    linha: "Terco 1",
    tipo_servico: "C. Emergencial",
    mecanicos: "Rafael",
    inicio: "date",
    termino: "date",
    tempo: "01:00",
    parada_maquina: "time",
    item_defeito: "string",
    problema: "string",
    solucao: "string",
    mecanicoQresolveu: "Gustavo",
    createdAt: new Date(),
    updatedAt: new Date(),
  }], {}),

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete("Ordens", null, {}),
};
