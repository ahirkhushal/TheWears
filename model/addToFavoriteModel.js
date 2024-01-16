const mongoose = require('mongoose');

const addToFavoriteSchema = mongoose.Schema({
  user: { type: mongoose.Schema.ObjectId, ref: 'User', require: true },
  tour: { type: mongoose.Schema.ObjectId, ref: 'Tour', require: true },
});

const AddToFavorite = mongoose.model('AddToFavorite', addToFavoriteSchema);

module.exports = AddToFavorite;
