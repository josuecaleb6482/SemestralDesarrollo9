const { DataTypes } = require("sequelize");

module.exports = model;

function model(sequelize) {
  const attributes = {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    fechaTran: { type: DataTypes.DATE, allowNull: false },
    idCliente: { type: DataTypes.INTEGER, allowNull: false },
    idServ: { type: DataTypes.INTEGER, allowNull: false },
    saldoInicial: { type: DataTypes.DECIMAL(18,2), allowNull: true },
    monto: { type: DataTypes.DECIMAL(18,2), allowNull: true },
    saldoActual: { type: DataTypes.DECIMAL(18,2), allowNull: true },
    fechaCrea: { type: DataTypes.DATE, allowNull: true },
    usuarioCrea: { type: DataTypes.INTEGER, allowNull: true },
    estado: { type: DataTypes.STRING, allowNull: true },
  };

  const options = {
    timestamps: false,
  };

  return sequelize.define("Transacciones", attributes, options);
}