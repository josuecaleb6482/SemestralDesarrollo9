const tedious = require('tedious');
const { Sequelize } = require('sequelize');

const { dbName, dbConfig } = require('../config.json');
const { required } = require('joi');

module.exports = db = {};

initialize();

async function initialize() {
    const dialect = 'mssql';
    const host = dbConfig.server;
    const { userName, password } = dbConfig.authentication.options;

    // create db if it doesn't already exist
    await ensureDbExists(dbName);
    
    // connect to db
    const sequelize = new Sequelize(dbName, userName, password, { host, dialect });

    // init models and add them to the exported db object
    db.User     = require('../components/users/usuarios.model')(sequelize);
    db.Entities = require('../components/entities/entidades.model')(sequelize);
    db.ClientEntitie = require('../components/clientEntities/clientEntities.model')(sequelize);
    db.Clientes = require('../components/clients/clients.model')(sequelize)
    db.Transacciones = require('../components/transacciones/transacciones.model')(sequelize)

    db.Clientes.hasMany(db.ClientEntitie, {foreignKey: 'id'})
    db.ClientEntitie.belongsTo(db.Clientes, {foreignKey: 'idCliente'})
    // sync all models with database
    //await sequelize.sync();
}

async function ensureDbExists(dbName) {
    return new Promise((resolve, reject) => {
        const connection = new tedious.Connection(dbConfig);
        connection.connect((err) => {
            if (err) {
                console.error(err);
                reject(`Connection Failed: ${err.message}`);
            }

            const createDbQuery = `IF NOT EXISTS(SELECT * FROM sys.databases WHERE name = '${dbName}') CREATE DATABASE [${dbName}];`;
            const request = new tedious.Request(createDbQuery, (err) => {
                if (err) {
                    console.error(err);
                    reject(`Create DB Query Failed: ${err.message}`);
                }

                // query executed successfully
                resolve();
            });

            connection.execSql(request);
        });
    });
}