var express = require('express')

const { postPokemon, getSpecies } = require('../controllers/pokemon')

var api = express.Router()

api.post("/pokemon/:name", postPokemon)
api.get("/pokemon/:name", getSpecies)

module.exports = api