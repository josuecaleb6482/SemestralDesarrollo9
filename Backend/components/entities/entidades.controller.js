const express = require('express');
const router = express.Router();
const Joi = require('joi');
const validateRequest = require('../../_middleware/validate-request');
//const Role = require('_helpers/role');
const entityService = require('./entidades.service');

// routes

router.get('/', getAll);
router.get('/:id', getById);

module.exports = router;

// route functions

function getAll(req, res, next) {
    entityService.getAll()
        .then(entities => res.json(entities))
        .catch(next);
}

function getById(req, res, next) {
    entityService.getById(req.params.id)
        .then(entity => res.json(entity))
        .catch(next);
}

function create(req, res, next) {
    entityService.create(req.body)
        .then(() => res.json({ message: 'User created' }))
        .catch(next);
}

function update(req, res, next) {
    entityService.update(req.params.id, req.body)
        .then(() => res.json({ message: 'User updated' }))
        .catch(next);
}

function _delete(req, res, next) {
    entityService.delete(req.params.id)
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