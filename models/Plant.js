import mongoose from 'mongoose';

const AutoIncrement = require('mongoose-sequence')(mongoose);

const EventSchema = new mongoose.Schema({
  event: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: new Date(),
  }
})

const PestSchema = new mongoose.Schema({
  pest_designation: {
    type: String,
    required: true,
  },
  treatment: {
    type: String,
    required: true,
  }
})

const PlantSchema = new mongoose.Schema({
  designation: {
    type: String,
    required: true,
  },
  scientific_name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    default: "",
  },
  /*distribution_map: {
    type: String,
    default: "",
  },*/
  kingdom: {
    type: String,
    default: "Plantae",
  },
  division: {
    type: String,
    default: "",
  },
  class: {
    type: String,
    default: "",
  },
  order: {
    type: String,
    default: "",
  },
  family: {
    type: String,
    default: "",
  },
  genus: {
    type: String,
    default: "",
  },
  species: {
    type: String,
    default: "",
  },/*
  distribution: {
    type: String,
    default: "",
  },
  habitat: {
    type: String,
    default: "",
  },
  aplications: {
    type: [String],
    default: "",
  },
  cultivation: {
    type: String,
    default: "",
  },
  life_cycle: {
    type: String,
    default: "",
  },
  harvest: {
    type: String,
    default: "",
  },*/
  n_specimens: {
    type: Number,
    default: 0,
  },
  place: {
    type: String,
    default: "",
  },/*
  caracterization: {
    type: String,
    default: "",
  },
  n_plants: {
    type: String,
    default: "",
  },
  plant_origin: {
    type: String,
    default: "",
  },
  observations: {
    type: String,
    default: "",
  },
  necessities: {
    type: [String],
    default: [],
  },
  companion_plants: {
    type: [String],
    default: [],
  },
  antagonistic_plants: {
    type: [String],
    default: [],
  },
  pests: {
    type: [PestSchema],
    default: [],
  },
  events: {
    type: [EventSchema],
    default: [],
  }*/
});
PlantSchema.plugin(AutoIncrement, { inc_field: 'id' });

export default mongoose.models.Plant || mongoose.model('Plant', PlantSchema);