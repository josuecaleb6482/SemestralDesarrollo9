const { DataTypes } = require('sequelize');

module.exports = model;

function model(sequelize) {
    const attributes = {
        nombre: { type: DataTypes.STRING},    
        ruc: { type: DataTypes.STRING},
        dv: { type: DataTypes.STRING},
        logo: { type: DataTypes.STRING},
        direccion: {type:DataTypes.STRING}
        
    };


    return sequelize.define('Entidades', attributes,{createdAt: false,

        // If don't want updatedAt
        updatedAt: false,});
}