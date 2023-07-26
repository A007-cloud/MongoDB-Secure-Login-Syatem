const jwt = require('jsonwebtoken');
require('dotenv').config();
const { StatusCodes } = require('http-status-codes');

module.exports = function (req, res, next) {
  const token = req.header('authorization');
  if (!token) return res.status(StatusCodes.UNAUTHORIZED).send('Access Denied');

  try {
    const verified = jwt.verify(token, process.env.TOKEN_SECRET, {
      expiresIn: '24h',
    });
    req.user = verified;
    next();
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).send('Invalid Token');
  }
};
