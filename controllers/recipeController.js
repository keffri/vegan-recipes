const Recipe = require('../models/recipe');
const Course = require('../models/course');
const Cuisine = require('../models/cuisine');

const async = require('async');

exports.index = (req, res) => {
  async.parallel(
    {
      recipe_count(callback) {
        Recipe.countDocuments({}, callback);
      },
      course_count(callback) {
        Course.countDocuments({}, callback);
      },
      cuisine_count(callback) {
        Cuisine.countDocuments({}, callback);
      },
    },

    (err, results) => {
      res.render('index', {
        title: 'Vegan Recipes',
        error: err,
        data: results,
      });
    }
  );
};

// Display list of all recipes.
exports.recipe_list = (req, res, next) => {
  Recipe.find({}, 'name')
    .sort({ name: 1 })
    .populate('course')
    .populate('cuisine')
    .exec(function (err, list_recipes) {
      if (err) {
        return next(err);
      }

      res.render('recipe_list', {
        title: 'Recipe List',
        recipe_list: list_recipes,
      });
    });
};

// Display detail page for a specific recipe.
exports.recipe_detail = (req, res) => {
  res.send(`NOT IMPLEMENTED: Recipe detail: ${req.params.id}`);
};
