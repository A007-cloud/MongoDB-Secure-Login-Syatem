const Joi = require('@hapi/joi');

//Register validate
const registerValidator = (data) => {
  const schema = Joi.object().keys({
    username: Joi.string().trim().min(4).max(30).required(),
    email: Joi.string()
      .trim()
      .regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)
      .email({ minDomainSegments: 2 })
      .required(),
    password: Joi.string().regex(/^[a-zA-Z0-9!@#$%^&*]{6,16}$/),
  });
  return Joi.validate(data, schema);
};

//Login Validation
const loginValidator = (data) => {
  const schema = Joi.object().keys({
    email: Joi.string()
      .trim()
      .regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)
      .email({ minDomainSegments: 2 })
      .required(),
    password: Joi.string().regex(/^[a-zA-Z0-9!@#$%^&*]{6,16}$/),
  });
  return Joi.validate(data, schema);
};

module.exports = { registerValidator, loginValidator };
