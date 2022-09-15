const Recipe = require('../models/recipe');
const Course = require('../models/course');
const Cuisine = require('../models/cuisine');
const async = require('async');
const { body, validationResult } = require('express-validator');

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

exports.recipe_create_get = (req, res, next) => {
  async.parallel(
    {
      courses(callback) {
        Course.find(callback);
      },
      cuisines(callback) {
        Cuisine.find(callback);
      },
    },
    (err, results) => {
      if (err) {
        return next(err);
      }
      res.render('recipe_form', {
        title: 'Recipe Form',
        courses: results.courses,
        cuisines: results.cuisines,
      });
    }
  );
};

exports.recipe_create_post = [
  body('name')
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage('A recipe name must be specified.'),
  body('prepTime'),
  body('cookTime'),
  body('totalTime'),
  body('servingSize'),
  body('link').isURL().withMessage('Invalid URL'),
  // body('course'),
  // body('cuisine'),

  (req, res, next) => {
    const errors = validationResult(req);

    const recipe = new Recipe({
      name: req.body.name,
      prepTime: req.body.prepTime,
      cookTime: req.body.cookTime,
      totalTime: req.body.totalTime,
      servingSize: req.body.servingSize,
      link: req.body.link,
      course: req.body.course,
      cuisine: req.body.cuisine,
    });

    if (!errors.isEmpty()) {
      async.parallel(
        {
          courses(callback) {
            Course.find(callback);
          },
          cuisines(callback) {
            Cuisine.find(callback);
          },
        },
        (err, results) => {
          if (err) {
            return next(err);
          }
          res.render('recipe_form', {
            title: 'Recipe Form',
            courses: results.courses,
            cuisines: results.cuisines,
            recipe,
            errors: errors.array(),
          });
        }
      );
      return;
    }

    recipe.save((err) => {
      if (err) {
        return next(err);
      }

      res.redirect(recipe.url);
    });
  },
];
