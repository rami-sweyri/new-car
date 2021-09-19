import Joi from '@hapi/joi';

export const schema = Joi.object().keys({
  name: Joi.string()
    .min(1)
    .max(250)
    .required()
    .messages({
      'string.base': `Name should be a type of 'text'`,
      'string.empty': `Name cannot be an empty field`,
      'string.min': `Name should have a minimum length of {#limit}`,
      'string.max': `Name should have a maximum length of {#limit}`,
      'any.required': `Name is a required field`,
    }),
  label: Joi.string()
    .min(1)
    .max(250)
    .required()
    .messages({
      'string.base': `Label should be a type of 'text'`,
      'string.empty': `Label cannot be an empty field`,
      'string.min': `Label should have a minimum length of {#limit}`,
      'string.max': `Label should have a maximum length of {#limit}`,
      'any.required': `Label is a required field`,
    }),
});

export const subSchema = Joi.object().keys({
  label: Joi.string()
    .min(1)
    .max(250)
    .required()
    .messages({
      'string.base': `Label should be a type of 'text'`,
      'string.empty': `Label cannot be an empty field`,
      'string.min': `Label should have a minimum length of {#limit}`,
      'string.max': `Label should have a maximum length of {#limit}`,
      'any.required': `Label is a required field`,
    }),
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
