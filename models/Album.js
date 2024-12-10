const mongoose = require('mongoose');

const albumSchema = new mongoose.Schema({
  name: { type: String, required: true },
  year: { type: Number, required: true },
  hidden: { type: Boolean, default: false },
  artist: { type: mongoose.Schema.Types.ObjectId, ref: 'Artist', required: true }
});

module.exports = mongoose.model('Album', albumSchema);