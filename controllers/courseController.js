const Course = require('../models/course');

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
exports.course_detail = (req, res) => {
  res.send(`NOT IMPLEMENTED: Course detail: ${req.params.id}`);
};
