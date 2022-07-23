 module.exports = app => {
    const entidades = require("../entidades.controller");
    var router = require("express").Router();
    const authorize = require('../../_middleware/authorize');
   // router.post('/authenticate', usuarios.authenticateSchema, usuarios.authenticate);
    router.post('/register', entidades.registerSchema, entidades.register);
    router.get('/', authorize(), entidades.getAll);
    router.get('/current', authorize(), entidades.getCurrent);
    router.get('/:id', authorize(), entidades.getById);
    router.put('/:id', authorize(), entidades.updateSchema, entidades.update);
    router.delete('/:id', authorize(), entidades._delete);
    app.use('/api/entidades', router);
  }