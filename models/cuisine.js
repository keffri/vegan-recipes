const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const CuisineScheme = new Schema({
  name: { type: String, maxLength: 20, required: true },
  country: { type: String, maxLength: 56, required: true },
});

CuisineScheme.virtual('url').get(function () {
  return `/cuisine/${this.id}`;
});

module.exports = mongoose.model('Cuisine', CuisineScheme);
