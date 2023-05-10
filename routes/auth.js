const express = require('express');
const router = express.Router();
const { registerUser, logInUser } = require('../controller/user');

// routes
router.route('/register').post(registerUser);
router.route('/login').post(logInUser);

module.exports = router;
