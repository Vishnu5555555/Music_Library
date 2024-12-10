const mongoose = require('mongoose');

const favoriteSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  entityId: { type: mongoose.Schema.Types.ObjectId, required: true },
  category: { type: String, enum: ['artist', 'album', 'track'], required: true }
});

module.exports = mongoose.model('Favorite', favoriteSchema);
