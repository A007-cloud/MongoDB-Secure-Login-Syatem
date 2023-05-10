const User = require('../models/User');
const {
  registerValidator,
  loginValidator,
} = require('../services/joi.Service');
const jwt = require('jsonwebtoken');
const { StatusCodes } = require('http-status-codes');
const bcrypt = require('bcrypt');
require('dotenv').config();

const registerUser = async (req, res) => {
  //lets validate the data before sending
  const { error } = registerValidator(req.body);
  if (error) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      name: 'provide your fullname as per ID',
      email: 'provide a valid email address',
      password:
        'provide password of six character contain atleast one number and one special character',
    });
  }
  //check if the user is already registered
  const emailExists = await User.findOne({ email: req.body.email });
  if (emailExists)
    return res.status(StatusCodes.BAD_REQUEST).send('user already registered');

  //hash password
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(req.body.password, salt);

  //create a new user
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: hashPassword,
  });
  try {
    const saveUser = await user.save();
    res.status(StatusCodes.CREATED).json({
      success: true,
      data: saveUser,
      message: 'user registered',
    });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(error.message);
  }
};

const logInUser = async (req, res) => {
  //lets validate the data before sending
  const { error } = loginValidator(req.body);
  if (error) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      error: error.name,
      subject: error.details[0].path,
    });
  }

  //check if the user is already registered
  const user = await User.findOne({ email: req.body.email });
  if (!user)
    return res.status(StatusCodes.BAD_REQUEST).send('wrong email or password');

  //check password is correct
  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword)
    return res.status(StatusCodes.BAD_REQUEST).send('password incorrect');

  // res.send('Logged In..!');

  try {
    const token = await jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
    res.header('auth-token', token).send({
      success: true,
      data: {
        name: user.name,
        email: user.email,
        token: token,
      },
      message: 'subscriber logged in',
    });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(error.message);
  }
};

module.exports = { registerUser, logInUser };
