const express = require('express');
//const router = express.Router();
const Joi = require('joi');

const validateRequest = require('../_middleware/validate-request');
//const Role = require('_helpers/role');
const userService = require('./usuarios.service');

exports.getAll = async (req, res, next) => {
    userService.getAll()
        .then(users => res.json(users))
        .catch(next);
};

exports.getById = async (req, res, next) => {
    userService.getById(req.params.id)
        .then(user => res.json(user))
        .catch(next);
};

exports.create = async (req, res, next) => {
    userService.create(req.body)
        .then(() => res.json({ message: 'User created' }))
        .catch(next);
};

exports.update = async (req, res, next) => {
    userService.update(req.params.id, req.body)
        .then(() => res.json({ message: 'User updated' }))
        .catch(next);
};


exports._delete = async (req, res, next) => {
    userService.delete(req.params.id)
        .then(() => res.json({ message: 'User deleted' }))
        .catch(next);
}

// schema functions

exports.createSchema = (req, res, next) => {
    const schema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().min(6).required(),
        confirmPassword: Joi.string().valid(Joi.ref('password')).required(),       
        nombre: Joi.string().required(),
        apellido: Joi.string().required()
    });
    validateRequest(req, next, schema);
}

exports.updateSchema = async (req, res, next) => {
    const schema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().min(6).required(),
        confirmPassword: Joi.string().valid(Joi.ref('password')).required(),       
        nombre: Joi.string().required(),
        apellido: Joi.string().required()
    }).with('password', 'confirmPassword');
    validateRequest(req, next, schema);
}