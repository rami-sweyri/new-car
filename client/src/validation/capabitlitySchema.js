import Joi from '@hapi/joi';

export const schema = Joi.object().keys({
  name: Joi.string()
    .min(3)
    .max(255)
    .required()
    .messages({
      'string.base': `Capabitlity Name should be a type of 'text'`,
      'string.empty': `Capabitlity Name cannot be an empty field`,
      'string.min': `Capabitlity Name should have a minimum length of {#limit}`,
      'string.max': `Capabitlity Name should have a maximum length of {#limit}`,
      'any.required': `Capabitlity Name is a required field`,
    }),
  label: Joi.string()
    .min(3)
    .max(255)
    .required()
    .messages({
      'string.base': `Capabitlity Label should be a type of 'text'`,
      'string.empty': `Capabitlity Label cannot be an empty field`,
      'string.min': `Capabitlity Label should have a minimum length of {#limit}`,
      'string.max': `Capabitlity Label should have a maximum length of {#limit}`,
      'any.required': `Capabitlity Label is a required field`,
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
