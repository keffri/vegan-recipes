var express = require('express');
var router = express.Router();

const recipe_controller = require('../controllers/recipeController');
const course_controller = require('../controllers/courseController');
const cuisine_controller = require('../controllers/cuisineController');

router.get('/', recipe_controller.index);

module.exports = router;
