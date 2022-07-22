const { DataTypes } = require('sequelize');

module.exports = model;

function model(sequelize) {
    const attributes = {
        email: { type: DataTypes.STRING},    
        passwordHash: { type: DataTypes.STRING},
        nombre: { type: DataTypes.STRING},
        apellido: { type: DataTypes.STRING}
    };

    const options = {
        defaultScope: {
            // exclude password hash by default
            attributes: { exclude: ['passwordHash'] }
        },
        scopes: {
            // include hash with this scope
            withHash: { attributes: {}, }
        }
    };

    return sequelize.define('Usuarios', attributes, options);
}