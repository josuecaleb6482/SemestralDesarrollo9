const express = require('express');
const router = express.Router();
const Joi = require('joi');

const validateRequest = require('../_middleware/validate-request');
const authorize = require('../_middleware/authorize')
const entidadService = require('./entidades.service');

 

exports.authenticateSchema = (req, res, next) => {
    const schema = Joi.object({
        nombre: Joi.string().required(),
        ruc: Joi.string().required()
    });
    validateRequest(req, next, schema);
}

 

exports.registerSchema = (req, res, next) => {
    const schema = Joi.object({
        nombre: Joi.string().required(),
        ruc: Joi.string().required(),
        dv: Joi.string().required(),
        logo: Joi.string().empty(''),
        direccion: Joi.string().empty(''),
        telefono: Joi.string().empty(''),
        email: Joi.string().empty(''),
        usuarioCrea: Joi.string().empty(''),
        usuarioModifica: Joi.string().empty(''),
        estado: Joi.string().empty('')
    });
    validateRequest(req, next, schema);
}

exports.register =  (req, res, next) => {
    entidadService.create(req.body)
        .then(() => res.json({ message: 'Registration successful' }))
        .catch(next);
}

exports.getAll = async(req, res, next) => {
    entidadService.getAll()
        .then(users => res.json(users))
        .catch(next);
}

exports.getCurrent = (req, res, next) => {
    res.json(req.user);
}

exports.getById = async(req, res, next) => {
    entidadService.getById(req.params.id)
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
    entidadService.update(req.params.id, req.body)
        .then(user => res.json(user))
        .catch(next);
}

exports._delete = async(req, res, next) => {
    entidadService.delete(req.params.id)
        .then(() => res.json({ message: 'User deleted successfully' }))
        .catch(next);
}