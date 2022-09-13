const Cuisine = require('../models/cuisine');

// Display list of all cuisines.
exports.cuisine_list = (req, res) => {
  res.send('NOT IMPLEMENTED: Cuisine list');
};

// Display detail page for a specific cuisine.
exports.cuisine_detail = (req, res) => {
  res.send(`NOT IMPLEMENTED: Cuisine detail: ${req.params.id}`);
};
