const { DataTypes } = require("sequelize");

module.exports = model;

function model(sequelize) {
  const attributes = {
    cedula:{ type: DataTypes.STRING, allowNull: true },
    nombre:{ type: DataTypes.STRING, allowNull: true },
    nombre2:{ type: DataTypes.STRING, allowNull: true },
    apellido:{ type: DataTypes.STRING, allowNull: true },
    apellido2:{ type: DataTypes.STRING, allowNull: true },
    email:{ type: DataTypes.STRING, allowNull: true },
    direccion:{ type: DataTypes.STRING, allowNull: true },
    telefono:{ type: DataTypes.STRING, allowNull: true },
    fechaCrea:{ type: DataTypes.DATE, allowNull: true },
    fechaModifica:{ type: DataTypes.DATE, allowNull: true },
    UsuarioCrea:{ type: DataTypes.INTEGER, allowNull: true },
    UsuarioModifica:{ type: DataTypes.INTEGER, allowNull: true },
    estado:{ type: DataTypes.STRING, allowNull: true },
  };

  const options = {
    timestamps: false
};


  return sequelize.define("Clientes", attributes, options);
}