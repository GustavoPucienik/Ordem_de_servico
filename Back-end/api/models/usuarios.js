module.exports = (sequelize, DataTypes) => {
  const usuarios = sequelize.define("usuarios", {
    nome: DataTypes.STRING,
    setor: DataTypes.STRING,
    email: DataTypes.STRING,
    senha: DataTypes.STRING,
  }, {});
  usuarios.associate = function (models) {
    // associations can be defined here
  };
  return usuarios;
};
