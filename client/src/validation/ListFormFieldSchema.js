import Joi from '@hapi/joi';

export const schema = Joi.object().keys({
  label: Joi.string()
    .min(3)
    .max(66)
    .required()
    .messages({
      'string.base': `Label should be a type of 'text'`,
      'string.empty': `Label cannot be an empty field`,
      'string.min': `Label should have a minimum length of {#limit}`,
      'string.max': `Label should have a maximum length of {#limit}`,
      'any.required': `Label is a required field`,
    }),
  type: Joi.string()
    .min(3)
    .max(66)
    .required()
    .messages({
      'string.base': ` Type should be a type of 'text'`,
      'string.empty': `Type cannot be an empty field`,
      'string.min': `Type should have a minimum length of {#limit}`,
      'string.max': `Type should have a maximum length of {#limit}`,
      'any.required': `Type is a required field`,
    })
});

export const validator = (schema, values, setValues) => {
  const valid = schema.validate(values, { abortEarly: false });
  const newErrorObject = {};
  if (valid.error) {
    valid.error.details.forEach((err) => {
      newErrorObject[err.path.join('.')] = err.message;
    });
  }
  setValues({ ...newErrorObject });
};
