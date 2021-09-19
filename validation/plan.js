const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);

const options = {
  errors: {
    wrap: {
      label: '',
    },
  },
};

const createPlanSchema = Joi.object({
  name: Joi.string().min(3).max(255).required(),
  label: Joi.string().min(3).max(255).required(),
  period: Joi.number().required(),
  price: Joi.number(),
  image: Joi.objectId(),
  note: Joi.string().min(0).allow('').allow(null).max(1255),
  description: Joi.string().min(3).max(1255),
  services: Joi.array().items(
    Joi.object({
      count: Joi.number(),
      service: Joi.objectId(),
    })
  ),
});

const updatePlanSchema = Joi.object({
  name: Joi.string().min(3).max(255),
  label: Joi.string().min(3).max(255),
  period: Joi.number(),
  price: Joi.number(),
  image: Joi.objectId(),
  note: Joi.string().min(0).allow('').allow(null),
  description: Joi.string().min(3).max(1255),
  services: Joi.array().items(
    Joi.object({
      _id: Joi.objectId(),
      count: Joi.number(),
      service: Joi.objectId(),
    })
  ),
  _id: Joi.objectId(),
});

const emptyPlanSchema = Joi.object({});

module.exports.createPlanValidate = body =>
  createPlanSchema.validate(body, options);

module.exports.updatePlanValidate = body =>
  updatePlanSchema.validate(body, options);

module.exports.emptyPlanValidate = body =>
  emptyPlanSchema.validate(body, options);
