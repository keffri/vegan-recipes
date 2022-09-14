const Course = require('../models/course');
const Recipe = require('../models/recipe');
const async = require('async');

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
