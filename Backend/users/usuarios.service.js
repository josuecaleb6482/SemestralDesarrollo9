const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const { secret } = require('../config.json');
const db = require('../_helpers/db');

module.exports = {
    authenticate,
    getAll,
    getById,
    create,
    update,
    delete: _delete
};

async function authenticate({ email, password }) {
    const user = await db.Usuarios.scope('withHash').findOne({ where: { email } });
    console.log("Autenticar")
    console.log(user);
    if (!user || !(await bcrypt.compare(password, user.hash)))
        throw 'Username or password is incorrect';

    // authentication successful
    const token = jwt.sign({ sub: user.id }, secret, { expiresIn: '7d' });
    return { ...omitHash(user.get()), token };
}

async function getAll() {
    return await db.Usuarios.findAll();
}

async function getById(id) {
    return await getUser(id);
}

async function create(params) {
    // validate
    if (await db.Usuarios.findOne({ where: { email: params.email } })) {
        throw 'Username "' + params.email + '" is already taken';
    }

    // hash password
    if (params.password) {
        params.hash = await bcrypt.hash(params.password, 10);
    }

    // save user
     
    //await db.Usuarios.create(params);
    const usuario = new db.Usuarios(params);
    
    //cliente.fechaCrea = sequelize.literal('CURRENT_TIMESTAMP')
     
    // save user
    await usuario.save();
}

async function update(id, params) {
    const user = await getUser(id);

    // validate
    const emailChanged = params.email && user.email !== params.email;
    if (emailChanged && await db.Usuarios.findOne({ where: { email: params.email } })) {
        throw 'Username "' + params.email + '" is already taken';
    }

    // hash password if it was entered
    if (params.password) {
        params.hash = await bcrypt.hash(params.password, 10);
    }

    // copy params to user and save
    Object.assign(user, params);
    await user.save();

    return omitHash(user.get());
}

async function _delete(id) {
    const user = await getUser(id);
    await user.destroy();
}

// helper functions

async function getUser(id) {
    const user = await db.Usuarios.findByPk(id);
    if (!user) throw 'User not found';
    return user;
}

function omitHash(user) {
    const { hash, ...userWithoutHash } = user;
    return userWithoutHash;
}