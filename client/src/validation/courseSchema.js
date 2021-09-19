import Joi from '@hapi/joi';

export const schema = Joi.object().keys({
  title: Joi.string()
    .min(1)
    .max(250)
    .required()
    .messages({
      'string.base': `Title should be a type of 'text'`,
      'string.empty': `Title cannot be an empty field`,
      'string.min': `Title should have a minimum length of {#limit}`,
      'string.max': `Title should have a maximum length of {#limit}`,
      'any.required': `Title is a required field`,
    }),
  level: Joi.array().items(Joi.string().required()),
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
