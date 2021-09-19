const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);

const options = {
  errors: {
    wrap: {
      label: '',
    },
  },
};

const createCarSchema = Joi.object({
  maker: Joi.string().min(3).max(255).required(),
  model: Joi.string().min(3).max(255).required(),
  color: Joi.string().min(3).max(255).required(),
  year: Joi.number().required(),
  plate: Joi.string().min(3).max(255).required(),
  image: Joi.objectId(),
  building: Joi.objectId().required(),
  city: Joi.objectId().required(),
  parkingNumber: Joi.string().min(3).max(255),
});

const updateCarSchema = Joi.object({
  maker: Joi.string().min(3).max(255),
  model: Joi.string().min(3).max(255),
  color: Joi.string().min(3).max(255),
  year: Joi.number(),
  plate: Joi.string().min(3).max(255),
  image: Joi.objectId(),
  parkingNumber: Joi.string().min(3).max(255),
  building: Joi.objectId(),
  city: Joi.objectId(),
  _id: Joi.objectId(),
});

const emptyCarSchema = Joi.object({});

module.exports.createCarValidate = body =>
  createCarSchema.validate(body, options);

module.exports.updateCarValidate = body =>
  updateCarSchema.validate(body, options);

module.exports.emptyCarValidate = body =>
  emptyCarSchema.validate(body, options);
