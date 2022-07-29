const Joi = require("joi");

const validateRequest = require("../../_middleware/validate-request");
const transacService = require("./transacciones.service");

exports.getAll = async (req, res, next) => {
  transacService
    .getAll()
    .then((trasnac) => res.json(trasnac))
    .catch(next);
};

exports.getByNumTran = async (req, res, next) => {
  transacService
    .getTransacByNumTran(req.body)
    .then((trasnac) => res.json(trasnac))
    .catch(next);
};

exports.getById = async (req, res, next) => {
  transacService
    .getById(req.params.id)
    .then((trasnac) => res.json(trasnac))
    .catch(next);
};

exports.getByIdCliente = async (req, res, next) => {
  transacService
    .getByIdCliente(req.params.idCliente)
    .then((trasnac) => res.json(trasnac))
    .catch(next);
};

exports.create = async (req, res, next) => {
    console.log("agregar transaccion")
  transacService
    .create(req.body)
    .then(() => res.json({ message: "Transacción exitosa" }))
    .catch(next);
};

exports.update = async (req, res, next) => {
  transacService
    .update(req.params.id, req.body)
    .then(() => res.json({ message: "Transacción actualizada" }))
    .catch(next);
};

exports._delete = async (req, res, next) => {
  transacService
    .delete(req.params.id)
    .then(() => res.json({ message: "Transacción eliminado" }))
    .catch(next);
};

// schema functions
exports.createSchema = (req, res, next) => {
  const schema = Joi.object({
    idCliente: Joi.number(),
    numTran : Joi.string(),
    fechaTran: Joi.date(),
    idCliente: Joi.number(),
    idServ: Joi.number(),
    numCuenta : Joi.string(),
    saldoInicial: Joi.number(),
    monto: Joi.number(),
    saldoActual: Joi.number(),
    fechaCrea: Joi.date(),
    usuarioCrea: Joi.number(),
    estado: Joi.string().max(1),
  });
  validateRequest(req, next, schema);
};

exports.updateSchema = async (req, res, next) => {
  const schema = Joi.object({
    idCliente: Joi.number(),
    numTran : Joi.string(),
    fechaTran: Joi.date(),
    idCliente: Joi.number(),
    idServ: Joi.number(),
    numCuenta : Joi.string(),
    saldoInicial: Joi.number(),
    monto: Joi.number(),
    saldoActual: Joi.number(),
    fechaCrea: Joi.date(),
    usuarioCrea: Joi.number(),
    estado: Joi.string().max(1),
  });
  validateRequest(req, next, schema);
};