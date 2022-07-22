const bcrypt = require('bcryptjs');
const sequelize = require('sequelize');

const db = require('../../_helpers/db');

module.exports = {
    getAll,
    getById,
    create,
    update,
    delete: _delete
};

async function getAll() {
    return await db.Clientes.findAll();
}

async function getById(id) {
    return await getClient(id);
}

async function create(params) {
    // validate
    if (await db.Clientes.findOne({ where: { email: params.email } })) {
        throw 'Email "' + params.email + '" ya está registrado';
    }

    const cliente = new db.Clientes(params);
    
    cliente.fechaCrea = sequelize.literal('CURRENT_TIMESTAMP')
    console.log(cliente)
    // save user
    await cliente.save();
}

async function update(id, params) {
    const cliente = await getClient(id);

    // validate
    const emailChanged = params.email && cliente.email !== params.email;
    if (emailChanged && await db.Clientes.findOne({ where: { email: params.email } })) {
        throw 'Email "' + params.email + '" ya está registrado';
    }

    cliente.fechaModifica = sequelize.literal('CURRENT_TIMESTAMP')
    
    Object.assign(cliente, params);
    await cliente.save();
}

async function _delete(id) {
    const cliente = await getClient(id);
    await cliente.destroy();
}

// helper functions

async function getClient(id) {
    const cliente = await db.Clientes.findByPk(id);
    if (!cliente) throw 'Cliente no encontrado';
    return cliente;
}