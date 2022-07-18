const router = require('express').Router();
const db = require('../../_helpers/db');
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const {jwtOptions} = require('../../_helpers/jwt.config');
const validateRequest = require('../../_middleware/validate-request');
const Joi = require('joi');


//function to add a user
const createUser = async ({ nombre , apellido, email , password }) => {
    return await db.User.create({ nombre , apellido,  email , password });
};

// find user
const getUser = async obj => {
    return await db.User.findOne({
        where: obj,
    });
};


// login
exports.login = async (req, res, next) => {
    
    const { email, password } = req.body;

    if (email && password) {
        let user = await getUser({ where: {email: email} });
        if (!user) {
          return  res.status(401).json({ message: 'Usuario no encontrado.' });
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
    }
};

exports.create = async (req, res, next) => {
    userService.create(req.body)
        .then(() => res.json({ message: 'User created' }))
        .catch(next);
};

//register a new user
exports.register =  async  (req, res, next) => {

    const user = await getUser({email : req.body.email});

    if(user)
        return   res.status(409).json({message : 'email ya existe.'});

    bcrypt.hash(req.body.password , null , null, (err, hash) => {
   
        createUser({
            nombre: req.body.nombre,
            apellido: req.body.apellido,
            email : req.body.email,
            password : hash,
        }).then(user =>
            res.status(200).json({ user, msg: 'usuario creado con exito.' }) );
    })
};

exports.createSchema = (req, res, next) => {
    const schema = Joi.object({
        email: Joi.string().email()
    });
    validateRequest(req, next, schema);
}