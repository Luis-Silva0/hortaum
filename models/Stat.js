import mongoose from 'mongoose';

const StatSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
  },
  numSpecies: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
});

export default mongoose.models.Stat || mongoose.model('Stat', StatSchema);