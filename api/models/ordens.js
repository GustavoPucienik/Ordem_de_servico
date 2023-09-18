module.exports = (sequelize, DataTypes) => {
  const Ordens = sequelize.define('Ordens', {
    dataReq: DataTypes.DATE,
    descricaoReq: DataTypes.STRING,
    tipoServico: DataTypes.STRING,
    mecanicos: DataTypes.STRING,
    inicio: DataTypes.DATE,
    termino: DataTypes.DATE,
    tempo: DataTypes.TIME,
    paradaMaquina: DataTypes.TIME,
    itemDefeituoso: DataTypes.STRING,
    problema: DataTypes.STRING,
    solucao: DataTypes.STRING,
    tecnico: DataTypes.STRING,
  }, {});
  Ordens.associate = function (models) {
    // associations can be defined here
  };
  return Ordens;
};