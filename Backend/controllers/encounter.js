const axios = require("axios").default;
const { default: mongoose } = require("mongoose");
const { Encounter } = require("../models/encounters/enconter");

const CACHE = {};
const ERROR = {};

const postEncounter = async (req, res) => {
  const { name } = req.params;
  const cache_name = `encounter_${name}`;
  const url = `https://pokeapi.co/api/v2/pokemon/${name}/encounters`;
  const filter = { name: `${name}` };
  const update = { createdAt: Date.now() };
  
  const pokemon = await Encounter.findOne(filter);

  if (pokemon !== null) {
    console.log(pokemon)
    let is_pokemon_update = await Encounter.findOneAndUpdate(filter, update, {
      new: true,
    });
    const data = pokemon.data
    if (is_pokemon_update)
      return await res.json({ name, data: data, isCached: true });
  }

  if (ERROR[name]) {
    return await res.json({
      name,
      data: JSON.parse(ERROR[cache_name]),
      isCached: true,
    });
  }

  let responseData;

  try {
    const { data } = await axios.get(url);
    responseData = data;
    const newEncounter = await new Encounter();
    newEncounter.data = data
    newEncounter.name = name
    console.log(newEncounter)
    const insertedEncounter = await newEncounter.save();
console.log(insertedEncounter)
    console.log(`Nuevo encounter ${name}`)

  } catch (err) {
    console.log("error", err);
    ERROR[cache_name] = JSON.stringify({ name, error: "Invalid encounter." });
  }
  res.json({ name, data: responseData, isCached: false });
};

module.exports = { postEncounter };