const Recipe = require('../models/recipe');
const Course = require('../models/course');
const Cuisine = require('../models/cuisine');

const async = require('async');
const { default: mongoose } = require('mongoose');
const course = require('../models/course');

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
exports.recipe_detail = (req, res, next) => {
  Recipe.findById(req.params.id)
    .populate('name')
    .populate('course')
    .populate('cuisine')
    .exec(function (err, recipe) {
      if (err) {
        return next(err);
      }
      if (recipe === null) {
        const err = new Error('Recipe not found');
        err.status = 404;
        return next(err);
      }
      res.render('recipe_detail', {
        title: 'Recipe Detail',
        recipe: recipe,
        course: recipe.course,
        cuisine: recipe.cuisine,
      });
    });
};
