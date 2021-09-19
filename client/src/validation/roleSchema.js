import Joi from '@hapi/joi';

export const schema = Joi.object().keys({
  name: Joi.string()
    .min(3)
    .max(255)
    .required()
    .messages({
      'string.base': `Role Name should be a type of 'text'`,
      'string.empty': `Role Name cannot be an empty field`,
      'string.min': `Role Name should have a minimum length of {#limit}`,
      'string.max': `Role Name should have a maximum length of {#limit}`,
      'any.required': `Role Name is a required field`,
    }),
  label: Joi.string()
    .min(3)
    .max(255)
    .required()
    .messages({
      'string.base': `Role Label should be a type of 'text'`,
      'string.empty': `Role Label cannot be an empty field`,
      'string.min': `Role Label should have a minimum length of {#limit}`,
      'string.max': `Role Label should have a maximum length of {#limit}`,
      'any.required': `Role Label is a required field`,
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
