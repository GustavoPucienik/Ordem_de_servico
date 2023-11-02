module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert("Ordens", [{
    usuario_req: "Gustavo",
    setor: "Manutenção",
    descricao_req: "Máquina parou de funcionar",
    linha: "Terco 1",
    tipo_servico: "C. Emergencial",
    mecanicos: "Rafael",
    inicio: "2023-11-01 14:00:00", // Formato: "YYYY-MM-DD HH:mm:ss"
    termino: "2023-11-01 14:30:00",
    tempo: "01:00",
    parada_maquina: "00:00",
    item_defeito: "Máquina",
    problema: "Parou",
    solucao: "Funcionou",
    concluida: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  }], {}),

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete("Ordens", null, {}),
};
