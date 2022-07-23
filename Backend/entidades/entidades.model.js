const { DataTypes } = require('sequelize');

module.exports = model;

function model(sequelize) {
    const attributes = {
        nombre: { type: DataTypes.STRING, allowNull: false },
        ruc: { type: DataTypes.STRING, allowNull: false },
        dv: { type: DataTypes.STRING, allowNull: false },
        logo: { type: DataTypes.STRING, allowNull: false },
        direccion: { type: DataTypes.STRING, allowNull: false },
        telefono: { type: DataTypes.STRING, allowNull: false },
        email: { type: DataTypes.STRING, allowNull: false },        
        usuarioCrea: { type: DataTypes.STRING, allowNull: false },
        usuarioModifica: { type: DataTypes.STRING, allowNull: false },
        estado: { type: DataTypes.STRING, allowNull: false }
    }
    ;

    const options = {
        defaultScope: {
            // exclude hash by default
           // attributes: { exclude: ['hash'] }
        },
        scopes: {
            // include hash with this scope
            withHash: { attributes: {}, }
        }
    };

    return sequelize.define('Entidades', attributes, options);
}