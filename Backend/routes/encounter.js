var express = require('express')

const { postEncounter } = require('../controllers/encounter')

var api = express.Router()

api.post("/encounter/:name/", postEncounter)

module.exports = api