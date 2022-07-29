module.exports = app => {
    const transacciones = require("./transacciones.controller");
    var router = require("express").Router();
    
    router.get('/', transacciones.getAll);
    router.get('/:id', transacciones.getById);
    router.get('/record/:idCliente', transacciones.getByIdCliente);
    router.post('/numTran', transacciones.getByNumTran)
    router.post('/', transacciones.createSchema, transacciones.create);
    router.put('/:id', transacciones.updateSchema, transacciones.update);
    router.delete('/:id', transacciones._delete);
    app.use('/api/transacciones', router);
  };