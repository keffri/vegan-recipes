const Recipe = require('../models/recipe');

exports.index = (req, res) => {
  res.send('Vegan Recipes');
};

// Display list of all recipes.
exports.recipe_list = (req, res) => {
  res.send('NOT IMPLEMENTED: Recipe list');
};

// Display detail page for a specific recipe.
exports.recipe_detail = (req, res) => {
  res.send(`NOT IMPLEMENTED: Recipe detail: ${req.params.id}`);
};
