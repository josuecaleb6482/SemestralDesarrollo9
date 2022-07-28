

module.exports = app => {
  const usuarios = require("../usuarios.controller");
  var router = require("express").Router();
  const authorize = require('../../_middleware/authorize');
  router.post('/authenticate', usuarios.authenticateSchema, usuarios.authenticate);
  router.post('/register', usuarios.registerSchema, usuarios.register);
  router.get('/', authorize(), usuarios.getAll);
  router.get('/current', authorize(), usuarios.getCurrent);
  router.get('/:id', authorize(), usuarios.getById);
  router.put('/:id', authorize(), usuarios.updateSchema, usuarios.update);
  router.delete('/:id', authorize(), usuarios._delete);
  app.use('/api/usuarios', router);
}