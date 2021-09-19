const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);

const options = {
  errors: {
    wrap: {
      label: '',
    },
  },
};

//   return schema.validate(user, options);
const registerSchema = Joi.object({
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
});

const registerPhoneSchema = Joi.object({
  phone: Joi.string()
    .min(4)
    .max(16)
    .regex(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im)
    .messages({
      'string.pattern.base': 'Phone number not valid',
    }),
});

const loginSchema = Joi.object({
  email: Joi.string()
    .min(6)
    .max(255)
    .email({
      tlds: { allow: false },
    })
    .required(),
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
});

const loginPhoneSchema = Joi.object({
  phone: Joi.string()
    .min(4)
    .max(16)
    .regex(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im)
    .messages({
      'string.pattern.base': 'Phone number not valid',
    }),
  code: Joi.string().min(6).max(6).required(),
});

const verifySchema = Joi.object({
  email: Joi.string()
    .min(6)
    .max(255)
    .email({
      tlds: { allow: false },
    })
    .required(),

  code: Joi.string().min(6).max(6).required(),
});

const reverifySchema = Joi.object({
  email: Joi.string()
    .min(6)
    .max(255)
    .email({
      tlds: { allow: false },
    })
    .required(),
});

const resetSchema = Joi.object({
  email: Joi.string()
    .min(6)
    .max(255)
    .email({
      tlds: { allow: false },
    })
    .required(),
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
  code: Joi.string().min(6).max(6).required(),
  passwordConfirmation: Joi.any().equal(Joi.ref('password')).required(),
});

const forgotSchema = Joi.object({
  email: Joi.string()
    .min(6)
    .max(255)
    .email({
      tlds: { allow: false },
    })
    .required(),
});

const profileSchema = Joi.object({
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
  pushToken: Joi.string(),
  _id: Joi.objectId(),
});

module.exports.registerValidate = body =>
  registerSchema.validate(body, options);
module.exports.registerPhoneValidate = body =>
  registerPhoneSchema.validate(body, options);

module.exports.loginPhoneValidate = body =>
  loginPhoneSchema.validate(body, options);
module.exports.loginValidate = body => loginSchema.validate(body, options);
module.exports.verifyValidate = body => verifySchema.validate(body, options);
module.exports.reverifyValidate = body =>
  reverifySchema.validate(body, options);
module.exports.resetValidate = body => resetSchema.validate(body, options);
module.exports.forgotValidate = body => forgotSchema.validate(body, options);
module.exports.profileValidate = body => profileSchema.validate(body, options);
