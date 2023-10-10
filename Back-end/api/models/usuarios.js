module.exports = (sequelize, DataTypes) => {
  const Usuarios = sequelize.define("Usuarios", {
    nome: DataTypes.STRING,
    senha: DataTypes.STRING,
    setor: DataTypes.STRING,
    tipo: DataTypes.STRING,
  }, {});
  Usuarios.associate = function (models) {
    // associations can be defined here
  };
  return Usuarios;
};
