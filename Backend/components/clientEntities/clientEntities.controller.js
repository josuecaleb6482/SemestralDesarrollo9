const express = require('express');
const router = express.Router();

//const Role = require('_helpers/role');
const entityService = require('./clientEntities.service');

// routes

router.post('/balance', getBalance);

module.exports = router;

// route functions

function getBalance(req, res, next) {
    const {serviceId:idServ,account} = req.body;

    entityService.getBalance(idServ,account)
      .then(entities => res.json(entities))
      .catch(next);
}

