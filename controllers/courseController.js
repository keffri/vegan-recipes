const Course = require('../models/course');

// Display list of all courses.
exports.course_list = (req, res) => {
  res.send('NOT IMPLEMENTED: Course list');
};

// Display detail page for a specific course.
exports.course_detail = (req, res) => {
  res.send(`NOT IMPLEMENTED: Course detail: ${req.params.id}`);
};
