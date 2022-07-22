const Joi = require('joi');

const validateRequest = require('../../_middleware/validate-request');
const clientService = require('./clients.service');

exports.getAll = async (req, res, next) => {
    clientService.getAll()
        .then(cliente => res.json(cliente))
        .catch(next);
};

exports.getById = async (req, res, next) => {
    clientService.getById(req.params.id)
        .then(cliente => res.json(cliente))
        .catch(next);
};

exports.create = async (req, res, next) => {
    clientService.create(req.body)
        .then(() => res.json({ message: 'Cliente creado' }))
        .catch(next);
};

exports.update = async (req, res, next) => {
    clientService.update(req.params.id, req.body)
        .then(() => res.json({ message: 'Cliente actualizado' }))
        .catch(next);
};

exports._delete = async (req, res, next) => {
    clientService.delete(req.params.id)
        .then(() => res.json({ message: 'Cliente eliminado' }))
        .catch(next);
}

const pattern = "^[0-9]{3,4}-[0-9]{4}$"
// schema functions
exports.createSchema = (req, res, next) => {
    const schema = Joi.object({
        email: Joi.string().email(),
        nombre: Joi.string().max(50),
        apellido: Joi.string().max(50),
        cedula: Joi.string().max(50),
        nombre2: Joi.string().max(50).min(0),
        apellido2: Joi.string().max(50).min(0),
        direccion: Joi.string().max(250),
        telefono : Joi.string().regex(new RegExp(pattern)),
    });
    validateRequest(req, next, schema);
}

exports.updateSchema = async (req, res, next) => {
    const schema = Joi.object({
        email: Joi.string().email(),
        nombre: Joi.string().max(50),
        apellido: Joi.string().max(50),
        cedula: Joi.string().max(50),
        nombre2: Joi.string().max(50).min(0),
        apellido2: Joi.string().max(50).min(0),
        direccion: Joi.string().max(250),
        telefono : Joi.string().regex(new RegExp(pattern)),
    });
    validateRequest(req, next, schema);
}