import Joi from "@hapi/joi";

export const creteSchema = Joi.object().keys({
  userName: Joi.string().min(3).required().messages({
    "string.base": `User Name should be a type of 'text'`,
    "string.empty": `User Name cannot be an empty field`,
    "string.min": `User Name should have a minimum length of {#limit}`,
    "string.max": `User Name should have a maximum length of {#limit}`,
    "any.required": `User Name is a required field`,
  }),

  email: Joi.string()
    .min(6)
    .email({ tlds: { allow: false } })
    .required()
    .messages({
      "string.empty": `Email cannot be an empty field`,
      "string.min": `Email should have a minimum length of {#limit}`,
      "any.required": `Email is a required field`,
    }),
  password: Joi.string().min(6).required().messages({
    "string.empty": `Password cannot be an empty field`,
    "string.min": `Password should have a minimum length of {#limit}`,
    "any.required": `Password is a required field`,
  }),
  passwordConfirmation: Joi.any().equal(Joi.ref("password")).required(),
});

export const editSchema = Joi.object().keys({
  userName: Joi.string().min(3).required().messages({
    "string.base": `User Name should be a type of 'text'`,
    "string.empty": `User Name cannot be an empty field`,
    "string.min": `User Name should have a minimum length of {#limit}`,
    "string.max": `User Name should have a maximum length of {#limit}`,
    "any.required": `User Name is a required field`,
  }),
  email: Joi.string()
    .min(6)
    .email({ tlds: { allow: false } })
    .required()
    .messages({
      "string.empty": `Email cannot be an empty field`,
      "string.min": `Email should have a minimum length of {#limit}`,
      "any.required": `Email is a required field`,
    }),
});
export const validator = (schema, values, setValues) => {
  const valid = schema.validate(values, { abortEarly: false });
  const newErrorObject = {};
  if (valid.error) {
    valid.error.details.forEach((err) => {
      newErrorObject[err.path.join(".")] = err.message.includes("ref:password")
        ? "password and password Confirmation must be same"
        : err.message;
    });
  }
  setValues({ ...newErrorObject });
};
