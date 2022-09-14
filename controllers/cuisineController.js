const Cuisine = require('../models/cuisine');
const Recipe = require('../models/recipe');
const async = require('async');

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
exports.cuisine_detail = (req, res, next) => {
  async.parallel(
    {
      cuisine(callback) {
        Cuisine.findById(req.params.id).exec(callback);
      },
      cuisine_recipes(callback) {
        Recipe.find({ cuisine: req.params.id }).exec(callback);
      },
    },
    (err, results) => {
      if (err) {
        return next(err);
      }
      if (results.cuisine === null) {
        const err = new Error('Cuisine not found');
        err.status = 404;
        return next(err);
      }

      res.render('cuisine_detail', {
        title: 'Cuisine Detail',
        cuisine: results.cuisine,
        cuisine_recipes: results.cuisine_recipes,
      });
    }
  );
};
