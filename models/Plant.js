import mongoose from 'mongoose';

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
  distribution_map: {
    type: String,
    default: "",
  },
  kingdom: {
    type: String,
    default: "Plant",
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
  },
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
  },
  n_specimens: {
    type: Number,
    default: "",
  },
  place: {
    type: String,
    default: "",
  },
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
    type: [String],
    default: "",
  }
});

export default mongoose.models.Plant || mongoose.model('Plant', PlantSchema);