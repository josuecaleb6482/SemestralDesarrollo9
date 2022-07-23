const sequelize = require("sequelize");

const db = require("../../_helpers/db");

module.exports = {
  getAll,
  getById,
  getByIdCliente,
  create,
  update,
  delete: _delete,
};

async function getAll() {
  return await db.Transacciones.findAll();
}

async function getById(id) {
  return await getTransac(id);
}

async function getByIdCliente(idCliente) {
    return await getAllClientTransac(idCliente);
  }

async function create(params) {
  const transacciones = new db.Transacciones(params);
  transacciones.fechaTran = sequelize.literal("CURRENT_TIMESTAMP");
  transacciones.fechaCrea = sequelize.literal("CURRENT_TIMESTAMP");
  console.log(params)
  transacciones.idServ = params.idServ
  await transacciones.save();
}

async function update(id, params) {
  const transacciones = await getTransac(id);

  transacciones.fechaModifica = sequelize.literal("CURRENT_TIMESTAMP");

  Object.assign(transacciones, params);
  await transacciones.save();
}

async function _delete(id) {
  const transacciones = await getTransac(id);
  await transacciones.destroy();
}

// helper functions
async function getTransac(id) {
  const transacciones = await db.Transacciones.findByPk(id);
  if (!transacciones) throw "Transacción no encontrada";
  return transacciones;
}

async function getAllClientTransac(idCliente) {
  const condiccion = { where: { idCliente: idCliente } };
  const transacciones = await db.Transacciones.findAll(condiccion);
  if (!transacciones) throw "No hay transacciones registradas";
  return transacciones;
}