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
exports.recipe_list = (req, res) => {
  res.send('NOT IMPLEMENTED: Recipe list');
};

// Display detail page for a specific recipe.
exports.recipe_detail = (req, res) => {
  res.send(`NOT IMPLEMENTED: Recipe detail: ${req.params.id}`);
};
