const bcrypt = require('bcryptjs');
const db = require('../../_helpers/db');
const jwt = require('jsonwebtoken');

const { secret } = require('../../config.json');

module.exports = {
    getById,
    authenticate,
    create
};

async function create(params) {

    // validate
    if (await db.User.findOne({ where: { email: params.email } })) {
        throw 'Username "' + params.email + '" is already taken';
    }

    // hash password
    if (params.password) {
        params.hash = await bcrypt.hash(params.password, 10);
    }

     
    //await db.Usuarios.create(params);
    const usuario = new db.User(params);
         
    // save user
    await usuario.save();
}

async function authenticate({ email, password }) {
    const user = await db.User.scope('withHash').findOne({ where: { email } });
    if (!user || !(await bcrypt.compare(password, user.hash)))
        throw 'Username or password is incorrect';

    // authentication successful
    const token = jwt.sign({ sub: user.id }, secret, { expiresIn: '7d' });
    return { ...omitHash(user.get()), token };
}


async function getById(id) {
    return await getUser(id);
}

async function getUser(id) {
    const user = await db.User.findByPk(id);
    if (user == '') throw 'User not found';
    return user;
}

function omitHash(user) {
    const { hash, ...userWithoutHash } = user;
    return userWithoutHash;
}