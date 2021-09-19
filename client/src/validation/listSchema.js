import Joi from '@hapi/joi';

export const schema = Joi.object().keys({
  name: Joi.string()
    .min(3)
    .max(121)
    .required()
    .messages({
      'string.base': `List Name should be a type of 'text'`,
      'string.empty': `List Name cannot be an empty field`,
      'string.min': `List Name should have a minimum length of {#limit}`,
      'string.max': `List Name should have a maximum length of {#limit}`,
      'any.required': `List Name is a required field`,
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
