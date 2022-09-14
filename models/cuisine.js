const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const CuisineScheme = new Schema({
  name: { type: String, maxLength: 20, required: true },
  country: { type: String, maxLength: 56, required: true },
  description: { type: String },
});

CuisineScheme.virtual('url').get(function () {
  return `/cookbook/cuisine/${this.id}`;
});

module.exports = mongoose.model('Cuisine', CuisineScheme);
