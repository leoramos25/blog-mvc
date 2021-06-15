const express = require('express');
const homeController = require('../controllers/homeController');
const userController = require('../controllers/userController')

const router = express.Router();
router.get('/', homeController.index);
router.get('/login', userController.login);
router.get('/register', userController.register);

module.exports = router;