const bcrypt = require('bcryptjs');

const db = require('../_helpers/db');



async function register(params) {
    // validate
    if (await db.User.findOne({ where: { email: params.email } })) {
        throw 'Email "' + params.email + '" ya está registrado';
    }

    const user = new db.User(params);
    
    // hash password
    user.passwordHash = await bcrypt.hash(params.password, 10);

    // save user
    await user.save();
}

async function login(params) {
    // validate
    if (await db.User.findOne({ where: { email: params.email } })) {
        throw 'Email "' + params.email + '" ya está registrado';
    }

    bcrypt.compare( password , user.password, (err, result) =>{
        if(err){
             res.status(403).json({message :'contraseña incorrecta.'});
        }
        if(result){
            let payload = { user };
            console.log(jwtOptions.secretOrKey);
            let token = jwt.sign(payload, jwtOptions.secretOrKey);
           return res.status(200).json({ message: 'ok', token });
        }
        else{
          return  res.status(403).json({message :'contraseña incorrecta.'});
        }
    })
    
    // hash password
    user.passwordHash = await bcrypt.hash(params.password, 10);

    // save user
    await user.save();
}

module.exports = {
    register,
    login,
};