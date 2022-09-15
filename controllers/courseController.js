const Course = require('../models/course');
const Recipe = require('../models/recipe');
const async = require('async');
const { body, validationResult } = require('express-validator');

// Display list of all courses.
exports.course_list = (req, res, next) => {
  Course.find({}, 'name')
    .sort({ name: 1 })
    .populate('name')
    .exec(function (err, list_courses) {
      if (err) {
        return next(err);
      }

      res.render('course_list', {
        title: 'Course List',
        course_list: list_courses,
      });
    });
};

// Display detail page for a specific course.
exports.course_detail = (req, res, next) => {
  async.parallel(
    {
      course(callback) {
        Course.findById(req.params.id).exec(callback);
      },
      course_recipes(callback) {
        Recipe.find({ course: req.params.id }).exec(callback);
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

      res.render('course_detail', {
        title: 'Course Detail',
        course: results.course,
        course_recipes: results.course_recipes,
      });
    }
  );
};

exports.course_create_get = (req, res, next) => {
  res.render('course_form', { title: 'Course Form' });
};

exports.course_create_post = [
  body('name')
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage('A course name must be specified.')
    .isAlphanumeric()
    .withMessage('Course name contains non-alphanumeric characters.'),
  (req, res, next) => {
    const errors = validationResult(req);

    const course = new Course({
      name: req.body.name,
    });

    if (!errors.isEmpty()) {
      res.render('course_form', {
        title: 'Course Form',
        course,
        errors: errors.array(),
      });
      return;
    } else {
      Course.findOne({ name: req.body.name }).exec((err, found_course) => {
        if (err) {
          return next(err);
        }

        if (found_course) {
          res.redirect(found_course.url);
        } else {
          course.save((err) => {
            if (err) {
              return next(err);
            }
            res.redirect(course.url);
          });
        }
      });
    }
  },
];
