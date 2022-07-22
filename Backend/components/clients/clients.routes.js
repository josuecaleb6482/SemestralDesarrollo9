module.exports = app => {
    const clientes = require("./clients.controller");
    var router = require("express").Router();
    
    router.get('/', clientes.getAll);
    router.get('/:id', clientes.getById);
    router.post('/', clientes.createSchema, clientes.create);
    router.put('/:id', clientes.updateSchema, clientes.update);
    router.delete('/:id', clientes._delete);
    app.use('/clients', router);
  };