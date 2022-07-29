module.exports = app => {
    const transacciones = require("./transacciones.controller");
    var router = require("express").Router();
    const authJwt = require('../../_middleware/authJwt');
    
    router.get('/', [authJwt.verifyToken, authJwt.isAdmin], transacciones.getAll);
    router.get('/:id', [authJwt.verifyToken, authJwt.isUser], transacciones.getById);
    router.get('/:idCliente', [authJwt.verifyToken, authJwt.isUser], transacciones.getByIdCliente);
    router.post('/',[authJwt.verifyToken, authJwt.isUser], transacciones.createSchema, transacciones.create);
    router.put('/:id',[authJwt.verifyToken, authJwt.isAdmin], transacciones.updateSchema, transacciones.update);
    router.delete('/:id',[authJwt.verifyToken, authJwt.isAdmin], transacciones._delete);
    app.use('/api/transacciones', router);
  };