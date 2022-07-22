const { DataTypes } = require('sequelize');

module.exports = model;

function model(sequelize) {
    const attributes = {
        idCliente: { type: DataTypes.STRING},    
        idServ: { type: DataTypes.STRING},
        cuenta: { type: DataTypes.STRING},
        saldoInicial: { type: DataTypes.STRING},
        saldoActual: {type:DataTypes.STRING}
        
    };

    
    return sequelize.define('ClienteEntidad', attributes,{freezeTableName: true,createdAt: false,updatedAt: false},);

}