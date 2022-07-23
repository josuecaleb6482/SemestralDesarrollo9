const express = require('express');
const router = express.Router();
const Joi = require('joi');

const validateRequest = require('../_middleware/validate-request');
const authorize = require('../_middleware/authorize')
const userService = require('./usuarios.service');

// // routes
// router.post('/authenticate', authenticateSchema, authenticate);
// router.post('/register', registerSchema, register);
// router.get('/', authorize(), getAll);
// router.get('/current', authorize(), getCurrent);
// router.get('/:id', authorize(), getById);
// router.put('/:id', authorize(), updateSchema, update);
// router.delete('/:id', authorize(), _delete);

// module.exports = router;

exports.authenticateSchema = (req, res, next) => {
    const schema = Joi.object({
        email: Joi.string().required(),
        password: Joi.string().required()
    });
    validateRequest(req, next, schema);
}

exports.authenticate = (req, res, next) => {
    userService.authenticate(req.body)
        .then(user => res.json(user))
        .catch(next);
}

exports.registerSchema = (req, res, next) => {
    const schema = Joi.object({
        nombre: Joi.string().required(),
        apellido: Joi.string().required(),
        email: Joi.string().required(),
        password: Joi.string().min(6).required(),
        rol: Joi.string().empty('')
    });
    validateRequest(req, next, schema);
}

exports.register =  (req, res, next) => {
    userService.create(req.body)
        .then(() => res.json({ message: 'Registration successful' }))
        .catch(next);
}

exports.getAll = async(req, res, next) => {
    userService.getAll()
        .then(users => res.json(users))
        .catch(next);
}

exports.getCurrent = (req, res, next) => {
    res.json(req.user);
}

exports.getById = async(req, res, next) => {
    userService.getById(req.params.id)
        .then(user => res.json(user))
        .catch(next);
}

exports.updateSchema = async(req, res, next) => {
    const schema = Joi.object({
        nombre: Joi.string().empty(''),
        apellido: Joi.string().empty(''),
        email: Joi.string().empty(''),
        password: Joi.string().min(6).empty(''),
        rol: Joi.string().empty('')
    });
    validateRequest(req, next, schema);
}

exports.update = async(req, res, next) => {
    userService.update(req.params.id, req.body)
        .then(user => res.json(user))
        .catch(next);
}

exports._delete = async(req, res, next) => {
    userService.delete(req.params.id)
        .then(() => res.json({ message: 'User deleted successfully' }))
        .catch(next);
}