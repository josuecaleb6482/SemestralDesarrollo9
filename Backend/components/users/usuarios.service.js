const bcrypt = require('bcryptjs');
const db = require('../../_helpers/db');
const jwt = require('jsonwebtoken');

const { secret } = require('../../config.json');

module.exports = {
    getAll,
    getById,
    authenticate
};

async function authenticate({ email, password }) {
    console.log(password)
    const user = await db.User.scope('withHash').findOne({ where: { email } });
    console.log("Autenticar")
    console.log(user);
    if (!user || !(await bcrypt.compare(password, user.hash)))
        throw 'Username or password is incorrect';

    // authentication successful
    const token = jwt.sign({ sub: user.id }, secret, { expiresIn: '7d' });
    return { ...omitHash(user.get()), token };
}

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

function omitHash(user) {
    const { hash, ...userWithoutHash } = user;
    return userWithoutHash;
}