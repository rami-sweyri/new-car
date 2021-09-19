import Joi from '@hapi/joi';

export const schema = Joi.object().keys({
  email: Joi.string()
    .min(6)
    .email({ tlds: { allow: false } })
    .required()
    .messages({
      'string.empty': `Email cannot be an empty field`,
      'string.min': `Email should have a minimum length of {#limit}`,
      'any.required': `Email is a required field`,
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
