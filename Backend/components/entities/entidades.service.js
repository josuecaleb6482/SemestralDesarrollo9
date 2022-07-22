const bcrypt = require('bcryptjs');

const db = require('../../_helpers/db');

module.exports = {
    getAll,
    getById
};

async function getAll() {
    try {
        return await db.Entities.findAll();
    } catch (error) {
        return(error)
    }
}
    

async function getById(id) {
    return await getEntity(id);
}

async function getEntity(id) {
    const entity = await db.Entities.findByPk(id);
    if (!entity) throw 'Entity not found';
    console.table(entity)
    return entity;
}