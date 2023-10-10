'use strict';
module.exports = (sequelize, DataTypes) => {
  const Ordens = sequelize.define('Ordens', {
    data_req: DataTypes.DATE,
    descricao_req: DataTypes.STRING,
    linha: DataTypes.STRING,
    tipo_servico: DataTypes.STRING,
    mecanicos: DataTypes.STRING,
    inicio: DataTypes.DATE,
    termino: DataTypes.DATE,
    tempo: DataTypes.TIME,
    parada_maquina: DataTypes.TIME,
    item_defeito: DataTypes.STRING,
    problema: DataTypes.STRING,
    solucao: DataTypes.STRING,
    usu_update_req: DataTypes.STRING
  }, {});
  Ordens.associate = function(models) {
    // associations can be defined here
  };
  return Ordens;
};
