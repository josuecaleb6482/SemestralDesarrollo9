const mongoose = require('../../config/mongoose'),
pokemonsSchema = require('../schemas/schemas').pokemonsSchema;

const models = {
    Pokemons: mongoose.model('Pokemon', pokemonsSchema)
};

module.exports = models;