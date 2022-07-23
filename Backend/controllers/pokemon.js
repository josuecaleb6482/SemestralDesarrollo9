const axios = require("axios").default;
const NodeCache = require("node-cache");
const { CACHE = 1 } = process.env;
const { Pokemons } = require("../models/pokemons/pokemons");

const cache = new NodeCache({ stdTTL: CACHE * 60 });
const ERROR = {};

const postPokemon = async (req, res) => {
  const { name, is_address, is_sprites, is_evolution } = req.params;
  const filter = { name: `${name}` };
  const update = { createdAt: Date.now() };
  const pokemon = await Pokemons.findOne(filter)

  if (pokemon !== null){
    let is_pokemon_update = await Pokemons.findOneAndUpdate(filter, update, {
      new: true
    });
    if(is_pokemon_update)
      return await res.json({ name, data: pokemon, isCached: true,})
  }
  if (ERROR[name])
    return await res.json({ name, data: JSON.parse(ERROR[name]), isCached: true, })

  const url = `https://pokeapi.co/api/v2/pokemon/${name}`;

  let responseData;

  try {
    const { data } = await axios.get(url);
    responseData = data;

    const newPokemon = await new Pokemons(data);
    const insertedPokemon = await newPokemon.save();

    console.log(`Nuevo pokemon ${name}`)

    res.json({ name, data: insertedPokemon, isCached: false });
  } catch {
    console.log("erro")
    ERROR[name] = JSON.stringify({ name, error: "Invalid pokemon." });
  }
};

const getSpecies = async (req, res) => {
  const { name } = req.params;
  const url = `https://pokeapi.co/api/v2/pokemon-species/${name}`;
  let responseData;

  try {
    const { data } = await axios.get(url);
    responseData = await data;
  } catch {
    ERROR[name] = JSON.stringify({ name, error: "Invalid pokemon." });
  }
  res.json({ name, data: responseData, isCached: false });
};

module.exports = { postPokemon, getSpecies };