var express = require('express');
var router = express.Router();

const recipe_controller = require('../controllers/recipeController');
const course_controller = require('../controllers/courseController');
const cuisine_controller = require('../controllers/cuisineController');

router.get('/', recipe_controller.index);

// RECIPE ROUTES
router.get('/recipes', recipe_controller.recipe_list);

// COURSE ROUTES

router.get('/courses', course_controller.course_list);

// CUISINE ROUTES

router.get('/cuisines', cuisine_controller.cuisine_list);

module.exports = router;
