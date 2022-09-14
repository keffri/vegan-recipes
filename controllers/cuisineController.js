const Cuisine = require('../models/cuisine');

// Display list of all cuisines.
exports.cuisine_list = (req, res, next) => {
  Cuisine.find({}, 'name country')
    .sort({ name: 1 })
    .populate('name')
    .exec(function (err, list_cuisines) {
      if (err) {
        return next(err);
      }

      res.render('cuisine_list', {
        title: 'Cuisine List',
        cuisine_list: list_cuisines,
      });
    });
};

// Display detail page for a specific cuisine.
exports.cuisine_detail = (req, res) => {
  res.send(`NOT IMPLEMENTED: Cuisine detail: ${req.params.id}`);
};
