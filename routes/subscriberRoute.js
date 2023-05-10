const express = require('express');
const router = express.Router();
const verifyRoute = require('../services/jwt.Service');

const { getUsers } = require('../controller/subscriber');

router.route('/').get(verifyRoute, getUsers);

module.exports = router;
