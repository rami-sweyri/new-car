import Joi from '@hapi/joi';

export const schema = Joi.object().keys({
  firstName: Joi.string()
    .min(3)
    .max(21)
    .required(),
  lastName: Joi.string()
    .min(3)
    .max(21)
    .required(),
  email: Joi.string()
    .min(6)
    .email({ tlds: { allow: false } })
    .required()
    .messages({
      'string.empty': `Email cannot be an empty field`,
      'string.min': `Email should have a minimum length of {#limit}`,
      'any.required': `Email is a required field`,
    }),
  password: Joi.string()
    .min(8)
    .max(255)
    .required()
    .messages({
      'string.empty': `Password cannot be an empty field`,
      'string.min': `Password should have a minimum length of {#limit}`,
      'any.required': `Password is a required field`,
    }),
  passwordConfirmation: Joi.any()
    .equal(Joi.ref('password'))
    .required(),
});

export const validator = (schema, values, setValues) => {
  const valid = schema.validate(values, { abortEarly: false });
  const newErrorObject = {};
  if (valid.error) {
    valid.error.details.forEach((err) => {
      newErrorObject[err.path.join('.')] = err.message.includes('ref:password')
        ? 'password and password Confirmation must be same'
        : err.message;
    });
  }
  setValues({ ...newErrorObject });
};
