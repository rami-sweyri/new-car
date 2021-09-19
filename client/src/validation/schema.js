import Joi from '@hapi/joi';

export const schema = Joi.object().keys({
  name: Joi.string()
    .min(1)
    .max(66)
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
    .required()
    .messages({
      'string.base': ` Type should be a type of 'text'`,
      'string.empty': `Type cannot be an empty field`,
      'string.min': `Type should have a minimum length of {#limit}`,
      'string.max': `Type should have a maximum length of {#limit}`,
      'any.required': `Type is a required field`,
    }),
  // pattern: Joi.string()
  //   .min(3)
  //   .max(66)
  //   .required()
  //   .messages({
  //     'string.base': ` Validation should be a type of 'text'`,
  //     'string.empty': `Validation cannot be an empty field`,
  //     'string.min': `Validation should have a minimum length of {#limit}`,
  //     'string.max': `Validation should have a maximum length of {#limit}`,
  //     'any.required': `Validation is a required field`,
  //   }),
  // patValMes: Joi.string()
  //   .min(3)
  //   .max(66)
  //   .required()
  //   .messages({
  //     'string.base': ` Validation Message should be a type of 'text'`,
  //     'string.empty': `Validation Message cannot be an empty field`,
  //     'string.min': `Validation Message should have a minimum length of {#limit}`,
  //     'string.max': `Validation Message should have a maximum length of {#limit}`,
  //     'any.required': `Validation Message is a required field`,
  //   }),
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
