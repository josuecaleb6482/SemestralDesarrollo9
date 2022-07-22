const bcrypt = require('bcryptjs');
const db = require('../../_helpers/db');

module.exports = {
    getAll,
    getById
};

async function getAll(_email, _pass) {
    
    const user =  await db.User.findAll({
        where : {
            passwordHash : _pass,
            email : _email.toString()
        }
    });

    if(user == '') throw 'User not found'
    
    return user;
}

async function getById(id) {
    return await getUser(id);
}

async function getUser(id) {
    const user = await db.User.findByPk(id);
    if (user == '') throw 'User not found';
    return user;
}