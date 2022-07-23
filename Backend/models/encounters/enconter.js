const mongoose = require('../../config/mongoose'),
pokemonsSchema = require('../schemas/schemas').pokemonsSchema;

const models = {
    Encounter: mongoose.model('Encounter', pokemonsSchema)
};

module.exports = models;