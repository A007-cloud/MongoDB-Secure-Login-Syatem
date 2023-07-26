const express = require('express');
const router = express.Router();
const verifyRoute = require('../services/jwt.Service');
const { registerUser, logInUser, logOutUser } = require('../controller/user');

// routes
router.route('/register').post(registerUser);
router.route('/login').post(logInUser);
router.route('/logout').post(verifyRoute, logOutUser);

module.exports = router;
