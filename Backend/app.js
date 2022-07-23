require("dotenv").config();

const express = require("express");
const cors = require("cors");
const app = express();
const { PORT = 3000 } = process.env;

////Mongoose
//const mongoose = require('mongoose');
//mongoose.connect('mongodb://localhost:27017/test');
//
//const Cat = mongoose.model('Cat', { name: String });
//
//const kitty = new Cat({ name: 'Zildjian' });
//kitty.save().then(() => console.log('meow'));
/////

app.use(cors());

const pokemon_routes = require('./routes/pokemon')
const cache_routes = require('./routes/cache')
const encounter_routes = require('./routes/encounter')

app.use('/', pokemon_routes)
app.use('/', cache_routes)
app.use('/', encounter_routes)

app.listen(PORT, () => {
  console.log(`Running on port ${PORT}...`);
});