var express = require('express');
var router = express.Router();

const recipe_controller = require('../controllers/recipeController');
const course_controller = require('../controllers/courseController');
const cuisine_controller = require('../controllers/cuisineController');

router.get('/', recipe_controller.index);

// RECIPE ROUTES

router.get('/recipes', recipe_controller.recipe_list);

router.get('/recipe/create', recipe_controller.recipe_create_get);

router.post('/recipe/create', recipe_controller.recipe_create_post);

router.get('/recipe/:id', recipe_controller.recipe_detail);

// COURSE ROUTES

router.get('/courses', course_controller.course_list);

router.get('/course/create', course_controller.course_create_get);

router.post('/course/create', course_controller.course_create_post);

router.get('/course/:id/delete/', course_controller.course_delete_get);

router.post('/course/:id/delete/', course_controller.course_delete_post);

router.get('/course/:id', course_controller.course_detail);

// CUISINE ROUTES

router.get('/cuisines', cuisine_controller.cuisine_list);

router.get('/cuisine/create', cuisine_controller.cuisine_create_get);

router.post('/cuisine/create', cuisine_controller.cuisine_create_post);

router.get('/cuisine/:id/delete/', cuisine_controller.cuisine_delete_get);

router.post('/cuisine/:id/delete/', cuisine_controller.cuisine_delete_post);

router.get('/cuisine/:id', cuisine_controller.cuisine_detail);

module.exports = router;
