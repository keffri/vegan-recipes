const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const CourseSchema = new Schema({
  name: { type: String, required: true, minLength: 4, maxLength: 10 },
});

CourseSchema.virtual('url').get(function () {
  return `/cookbook/course/${this.id}`;
});

module.exports = mongoose.model('Course', CourseSchema);
