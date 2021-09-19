const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);

const options = {
  errors: {
    wrap: {
      label: '',
    },
  },
};

const createCitySchema = Joi.object({
  name: Joi.string().min(3).max(255).required(),
  label: Joi.string().min(3).max(255),
  buildings: Joi.array().items(Joi.objectId()),
});

const updateCitySchema = Joi.object({
  name: Joi.string().min(3).max(255),
  label: Joi.string().min(3).max(255),
  buildings: Joi.array().items(Joi.objectId()),
  _id: Joi.objectId(),
});

const emptyCitySchema = Joi.object({});

module.exports.createCityValidate = body =>
  createCitySchema.validate(body, options);

module.exports.updateCityValidate = body =>
  updateCitySchema.validate(body, options);

module.exports.emptyCityValidate = body =>
  emptyCitySchema.validate(body, options);
