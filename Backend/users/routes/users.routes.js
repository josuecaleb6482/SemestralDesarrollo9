module.exports = app => {
    const usuarios = require("../usuarios.controller");
    var router = require("express").Router();
    
    router.get('/', usuarios.getAll);
    router.get('/:id', usuarios.getById);
    router.post('/', usuarios.createSchema, usuarios.create);
    router.put('/:id', usuarios.updateSchema, usuarios.update);
    router.delete('/:id', usuarios._delete);
    app.use('/api/usuarios', router);
  };