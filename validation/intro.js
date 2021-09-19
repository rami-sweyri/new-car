const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);

const options = {
  errors: {
    wrap: {
      label: '',
    },
  },
};

const createIntroSchema = Joi.object({
  name: Joi.string().min(3).max(255).required(),
  label: Joi.string().min(3).max(255).required(),
  description: Joi.string().min(3).max(1255).required(),
  image: Joi.objectId(),
});

const updateIntroSchema = Joi.object({
  name: Joi.string().min(3).max(255),
  label: Joi.string().min(3).max(255),
  description: Joi.string().min(3).max(1255),
  image: Joi.objectId(),
  _id: Joi.objectId(),
});

const emptyIntroSchema = Joi.object({});

module.exports.createIntroValidate = body =>
  createIntroSchema.validate(body, options);

module.exports.updateIntroValidate = body =>
  updateIntroSchema.validate(body, options);

module.exports.emptyIntroValidate = body =>
  emptyIntroSchema.validate(body, options);
