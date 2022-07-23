const mongoose = require("../../config/mongoose");

const ability = mongoose.Schema({
  id: Number,
  name: String,
  is_main_series: Boolean,
  generation: {
    name: String,
    url: String,
  },
  names: [
    {
      name: String,
      lenguage: {
        name: String,
        url: String,
      },
    },
  ],
  effect_entries: [
    {
      effect: String,
      short_effect: String,
      lenguage: {
        name: String,
        url: String,
      },
    },
  ],
  effect_changes: [
    {
      version_group: {
        name: String,
        url: String,
      },
      effect_entries: [
        {
          effect: String,
          short_effect: String,
          lenguage: {
            name: String,
            url: String,
          },
        },
      ],
    },
  ],
  flavor_text_entries: [
    {
      flavor_text: String,
      lenguage: {
        name: String,
        url: String,
      },
      version_group: {
        name: String,
        url: String,
      },
    },
  ],
  pokemon: {
    name: String,
    url: String,
  },
});

const lenguage = mongoose.Schema({
  lenguage: {
    name: String,
    url: String,
  },
});

const schema = mongoose.Schema({
  id: Number,
  name: String,
  base_experience: Number,
  height: Number,
  is_default: Boolean,
  order: Number,
  weight: Number,
  abilities: [
    {
      is_hidden: Boolean,
      slot: Number,
      ability: {
        name: String,
        url: String,
      },
    },
  ],
  forms: [
    {
      name: String,
      url: String,
    },
  ],
  game_indices: [
    {
      game_index: Number,
      version: {
        name: String,
        url: String,
      },
    },
  ],
  held_items: [
    {
      item: {
        name: String,
        url: String,
      },
      version_details: [
        {
          rarity: Number,
          version: {
            name: String,
            url: String,
          },
        },
      ],
    },
  ],
  location_area_encounters: String,
  moves: [
    {
      move: {
        name: String,
        url: String,
      },
      version_group_details: [
        {
          level_learned_at: Number,
          version_group: {
            name: String,
            url: String,
          },
          move_learn_method: {
            name: String,
            url: String,
          },
        },
      ],
    },
  ],
  species: {
    name: String,
    url: String,
  },
  sprites: {
    back_default: String,
    back_female: String,
    back_shiny: String,
    back_shiny_female: String,
    front_default: String,
    front_female: String,
    front_shiny: String,
    front_shiny_female: String,
    other: {
      dream_world: {
        front_default: String,
        front_female: String,
      },
      home: {
        front_default: String,
        front_female: String,
        front_shiny: String,
        front_shiny_female: String,
      },
      "official-artwork": {
        front_default: String,
      },
    },
    versions: {
      Object,
    },
  },
  stats: [
    {
      base_stat: Number,
      effort: Number,
      stat: {
        name: String,
        url: String,
      },
    },
  ],
  types: [
    {
      type: {
        slot: Number,
        type: {
          name: String,
          url: String,
        },
      },
    },
  ],
  past_types: [
    {
      generation: {
        name: String,
        url: String,
      },
      types: [
        {
          slot: Number,
          type: {
            name: String,
            url: String,
          },
        },
      ],
    },
  ],
  createdAt: { type: Date, expires: `${process.env}m`, default: Date.now },
});

const encounterSchema = mongoose.Schema({
  data: [],
  createdAt: { type: Date, expires: `${process.env}m`, default: Date.now }, name:String
}
);

const Pokemon = mongoose.model("Pokemon", schema);
const Encounter = mongoose.model("Encounter", encounterSchema);

module.exports = {Pokemon, Encounter};