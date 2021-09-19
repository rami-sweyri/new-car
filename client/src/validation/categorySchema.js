import Joi from '@hapi/joi';

export const schema = Joi.object().keys({
  name: Joi.string()
    .min(3)
    .max(121)
    .required()
    .messages({
      'string.base': `Category Name should be a type of 'text'`,
      'string.empty': `Category Name cannot be an empty field`,
      'string.min': `Category Name should have a minimum length of {#limit}`,
      'string.max': `Category Name should have a maximum length of {#limit}`,
      'any.required': `Category Name is a required field`,
    }),
  label: Joi.string()
    .min(3)
    .max(121)
    .required()
    .messages({
      'string.base': `Category Label should be a type of 'text'`,
      'string.empty': `Category Label cannot be an empty field`,
      'string.min': `Category Label should have a minimum length of {#limit}`,
      'string.max': `Category Label should have a maximum length of {#limit}`,
      'any.required': `Category Label is a required field`,
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
