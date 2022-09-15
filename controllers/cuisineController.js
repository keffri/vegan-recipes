const Cuisine = require('../models/cuisine');
const Recipe = require('../models/recipe');
const async = require('async');
const { body, validationResult } = require('express-validator');

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

// Get request for creating a Cuisine.
exports.cuisine_create_get = (req, res, next) => {
  res.render('cuisine_form', { title: 'Cuisine Form' });
};

exports.cuisine_create_post = [
  body('name')
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage('Cuisine name must be specified.')
    .isAlphanumeric()
    .withMessage('Cuisine name contains non-alphanumeric characters.'),
  body('country')
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage('Country of origin must be specified.')
    .isAlphanumeric()
    .withMessage('Country name contains non-alphanumeric characters.'),
  body('description')
    .optional({ checkFalsy: true })
    .trim()
    .isLength({ min: 12 })
    .escape()
    .withMessage('Cuisine description must contain more information.'),
  (req, res, next) => {
    const errors = validationResult(req);

    const cuisine = new Cuisine({
      name: req.body.name,
      country: req.body.country,
      description: req.body.description,
    });

    if (!errors.isEmpty()) {
      // If form contains errors, Render form again with sanitized values/error messages.
      res.render('cuisine_form', {
        title: 'Cuisine Form',
        cuisine,
        errors: errors.array(),
      });
      return;
    } else {
      Cuisine.findOne({ name: req.body.name }).exec((err, found_cuisine) => {
        if (err) {
          return next(err);
        }

        if (found_cuisine) {
          res.redirect(found_cuisine.url);
        } else {
          cuisine.save((err) => {
            if (err) {
              return next(err);
            }

            res.redirect(cuisine.url);
          });
        }
      });
    }
  },
];
