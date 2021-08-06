const Joi = require('joi');
const { HttpCodes, validationConfig } = require('../helpers/constants');

const schemaRegisterUser = Joi.object({
  name: Joi.string()
    .trim()
    .min(validationConfig.minNameLength)
    .max(validationConfig.maxNameLength)
    .required(),
  email: Joi.string()
    .email({
      minDomainSegments: validationConfig.minDomainSegments,
    })
    .required(),
  password: Joi.string()
    .trim()
    .min(validationConfig.minPasswordLength)
    .required(),
});

const schemaLoginUser = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().required(),
});

const validateRequestAgainstSchema = async (schema, request, next) => {
  try {
    await schema.validateAsync(request);
    next();
  } catch (error) {
    next({
      status: HttpCodes.BAD_REQUEST,
      message: error.message,
    });
  }
};

const validateRegisterUser = (req, res, next) => {
  return validateRequestAgainstSchema(schemaRegisterUser, req.body, next);
};

const validateLoginUser = (req, res, next) => {
  return validateRequestAgainstSchema(schemaLoginUser, req.body, next);
};

module.exports = { validateRegisterUser, validateLoginUser };
