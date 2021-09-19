const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);

const options = {
  errors: {
    wrap: {
      label: '',
    },
  },
};

const createUserSchema = Joi.object({
  firstName: Joi.string().alphanum().min(3).max(255),
  lastName: Joi.string().alphanum().min(3).max(255),
  userName: Joi.string().alphanum().min(3).max(255),
  email: Joi.string()
    .min(6)
    .max(255)
    .email({
      tlds: { allow: false },
    })
    .required(),
  phone: Joi.string()
    .min(4)
    .max(16)
    .regex(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im)
    .messages({
      'string.pattern.base': 'Phone number not valid',
    }),
  password: Joi.string()
    .min(8)
    .max(1025)
    // .pattern(
    //   new RegExp(
    //     /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
    //   )
    // )
    .required(),
  // .messages({
  //   'string.pattern.base':
  //     'Password must contain at least one uppercase letter, one lowercase letter, one number and one special character',
  // }),
  passwordConfirmation: Joi.any().equal(Joi.ref('password')).required(),
  roles: Joi.array().items(Joi.objectId()),
});

const updateUserSchema = Joi.object({
  firstName: Joi.string().alphanum().min(3).max(255),
  lastName: Joi.string().alphanum().min(3).max(255),
  userName: Joi.string().alphanum().min(3).max(255),
  email: Joi.string()
    .min(6)
    .max(255)
    .email({
      tlds: { allow: false },
    }),
  phone: Joi.string()
    .min(4)
    .max(16)
    .regex(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im)
    .messages({
      'string.pattern.base': 'Phone number not valid',
    }),
  password: Joi.string().min(8).max(1025),
  // .pattern(
  //   new RegExp(
  //     /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
  //   )
  // )
  // .messages({
  //   'string.pattern.base':
  //     'Password must contain at least one uppercase letter, one lowercase letter, one number and one special character',
  // }),
  passwordConfirmation: Joi.any().equal(Joi.ref('password')),
  roles: Joi.array().items(Joi.objectId()),
  _id: Joi.objectId(),
});

const emptyUserSchema = Joi.object({});

module.exports.createUserValidate = body =>
  createUserSchema.validate(body, options);

module.exports.updateUserValidate = body =>
  updateUserSchema.validate(body, options);

module.exports.emptyUserValidate = body =>
  emptyUserSchema.validate(body, options);
