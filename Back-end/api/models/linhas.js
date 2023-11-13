module.exports = (sequelize, DataTypes) => {
  const linhas = sequelize.define("linhas", {
    nomeDaLinha: DataTypes.STRING,
  }, {});
  linhas.associate = function (models) {
    // associations can be defined here
  };
  return linhas;
};
