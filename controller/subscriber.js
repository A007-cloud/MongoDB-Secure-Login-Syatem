const User = require('../models/User');
const { StatusCodes } = require('http-status-codes');

const getUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.status(StatusCodes.OK).json({
      success: true,
      length: users.length,
      data: users,
      message: 'list of subscribers',
    });
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(err.message);
  }
};

module.exports = { getUsers };
