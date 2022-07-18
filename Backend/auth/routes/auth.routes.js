module.exports = app => {
    const auth = require("../controllers/auth.controller");
    var router = require("express").Router();
    
    router.post('/login', auth.createSchema, auth.login);
    router.post('/register', auth.createSchema, auth.register);
    app.use('/api/auth', router);
  };