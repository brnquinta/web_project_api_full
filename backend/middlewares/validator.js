const { celebrate, Joi, Segments } = require('celebrate');
const validator = require('validator');

const validateUrl = (value, helpers) => {
  if (validator.isURL(value)) return value;
  return helpers.error('string.uri');
};

module.exports.validateSignup = celebrate({
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().custom(validateUrl),
  }),
});

module.exports.validateLogin = celebrate({
  [Segments.BODY]: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
});