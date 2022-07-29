const express = require('express');
const router = express.Router();
const Joi = require('joi');
const jwt = require('jsonwebtoken')
const validateRequest = require('../../_middleware/validate-request');
//const Role = require('_helpers/role');
const userService = require('./usuarios.service');

// routes

//router.get('/', getAll);
router.get('/:id', getById);
router.post('/login',getLogin);
router.post('/authenticate', authenticateSchema, authenticate);
router.post('/register', registerSchema, register);

module.exports = router;


function registerSchema (req, res, next)  {
    const schema = Joi.object({
        nombre: Joi.string().required(),
        apellido: Joi.string().required(),
        email: Joi.string().required(),
        password: Joi.string().min(6).required(),
        rol: Joi.string().empty('')
    });
    validateRequest(req, next, schema);
}

function register (req, res, next) {
    userService.create(req.body)
        .then(() => res.json({ message: 'Registration successful' }))
        .catch(next);
}
// route functions
function authenticateSchema (req, res, next) {
    const schema = Joi.object({
        email: Joi.string().required(),
        password: Joi.string().required()
    });
    validateRequest(req, next, schema);
}

function authenticate (req, res, next) {
    userService.authenticate(req.body)
        .then(user => res.json(user))
        .catch(next);
}

async function getLogin (req ,res) {
    const {_email, _pass} = req.body
    try {
        const response = await userService.getAll(_email,_pass)
        const payload = {
            check : true
        }
        
        const token = jwt.sign(payload,process.env.JSON_KEY)
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({ user: response,token: token }));
        
    } catch (error) {
        res.status(404).json({error:error})
    }
    
}

function getAll(req, res, next) {
    userService.getAll()
        .then(users => res.json(users))
        .catch(next);
}

function getById(req, res, next) {
    userService.getById(req.params.id)
        .then(user => res.json(user))
        .catch(next);
}

function create(req, res, next) {
    userService.create(req.body)
        .then(() => res.json({ message: 'User created' }))
        .catch(next);
}

function update(req, res, next) {
    userService.update(req.params.id, req.body)
        .then(() => res.json({ message: 'User updated' }))
        .catch(next);
}

function _delete(req, res, next) {
    userService.delete(req.params.id)
        .then(() => res.json({ message: 'User deleted' }))
        .catch(next);
}

// schema functions

function createSchema(req, res, next) {
    const schema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().min(6).required(),
        confirmPassword: Joi.string().valid(Joi.ref('password')).required(),       
        nombre: Joi.string().required(),
        apellido: Joi.string().required()
    });
    validateRequest(req, next, schema);
}

function updateSchema(req, res, next) {
    const schema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().min(6).required(),
        confirmPassword: Joi.string().valid(Joi.ref('password')).required(),       
        nombre: Joi.string().required(),
        apellido: Joi.string().required()
    }).with('password', 'confirmPassword');
    validateRequest(req, next, schema);
}