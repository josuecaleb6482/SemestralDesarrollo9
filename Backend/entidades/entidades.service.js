const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const { secret } = require('../config.json');
const db = require('../_helpers/db');

module.exports = {   
    getAll,
    getById,
    create,
    update,
    delete: _delete
};

 

async function getAll() {
    return await db.Entidades.findAll();
}

async function getById(id) {
    return await getEntidad(id);
}

async function create(params) {
    // validate
    if (await db.Entidades.findOne({ where: { nombre: params.nombre } })) {
        throw 'Nombre "' + params.nombre + '" ya existe';
    }

     

    // save user
     
    //await db.Usuarios.create(params);
    const entidad = new db.Entidades(params);
    
    //cliente.fechaCrea = sequelize.literal('CURRENT_TIMESTAMP')
     
    // save user
    await entidad.save();
}

async function update(id, params) {
    const entidad = await getEntidad(id);

    // validate
    const nameChanged = params.nombre && entidad.nombre !== params.nombre;
    if (nameChanged && await db.Entidades.findOne({ where: { nombre: params.nombre } })) {
        throw 'Entidad "' + params.nombre + '" ya existe';
    }

    

    // copy params to user and save
    Object.assign(entidad, params);
    await entidad.save();

   // return omitHash(entidad.get());
   return  entidad.get();
}

async function _delete(id) {
    const entidad = await getEntidad(id);
    await entidad.destroy();
}

// helper functions

async function getEntidad(id) {
    const entidad = await db.Entidades.findByPk(id);
    if (!entidad) throw 'User not found';
    return entidad;
}

 