import Joi from '@hapi/joi';

export const schema = Joi.object().keys({
  id: Joi.any(),
  name: Joi.string()
    .min(3)
    .max(66)
    .required()
    .messages({
      'string.base': `Name should be a type of 'text'`,
      'string.empty': `Name cannot be an empty field`,
      'string.min': `Name should have a minimum length of {#limit}`,
      'string.max': `Name should have a maximum length of {#limit}`,
      'any.required': `Name is a required field`,
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
    }),
  fields: Joi.array()
    .has(Joi.object({
        type: Joi.string().valid('email'),
        isRequired: true,
        label: Joi.any()
    }))
    .required()
    .messages({
        'array.base': ` fields should contain email field at least`,
        'array.empty': `fields should contain email field at least`,
        'any.required': `fields should contain email field at least`,
    }),
});

export const validator = (schema, values, setValues) => {
    console.log('values', values)
  const valid = schema.validate(values, { abortEarly: false });
  const newErrorObject = {};
  if (valid.error) {
    valid.error.details.forEach((err) => {
      newErrorObject[err.path.join('.')] = err.message;
    });
  }
  setValues({ ...newErrorObject });
};
