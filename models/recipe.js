const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const RecipeSchema = new Schema({
  name: { type: String, required: true, maxLength: 50 },
  ingredients: [String],
  prepTime: { type: Number, min: 1, max: 60 },
  cookTime: { type: Number, min: 1, max: 240 },
  totalTime: { type: Number, min: 2, max: 300 },
  servingSize: { type: Number, min: 1, max: 10 },
  link: { type: String, required: true, maxLength: 100 },
  course: { type: Schema.Types.ObjectId, ref: 'Course', required: true },
  cuisine: { type: Schema.Types.ObjectId, ref: 'Cuisine', required: true },
});

RecipeSchema.virtual('url').get(function () {
  return `/recipe/${this.id}`;
});

module.exports = mongoose.model('Recipe', RecipeSchema);
