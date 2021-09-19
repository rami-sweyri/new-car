const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);

const options = {
  errors: {
    wrap: {
      label: '',
    },
  },
};

const createServiceSchema = Joi.object({
  name: Joi.string().min(3).max(255).required(),
  label: Joi.string().min(3).max(255).required(),
  price: Joi.number(),
  extraAble: Joi.boolean(),
  note: Joi.string().min(0).allow('').allow(null).max(1255),
  description: Joi.string().min(3).max(1255),
});

const updateServiceSchema = Joi.object({
  name: Joi.string().min(3).max(255),
  label: Joi.string().min(3).max(255),
  price: Joi.number(),
  extraAble: Joi.boolean(),
  note: Joi.string().min(0).allow('').allow(null).max(1255),
  description: Joi.string().min(3).max(1255),
  _id: Joi.objectId(),
});

const emptyServiceSchema = Joi.object({});

module.exports.createServiceValidate = body =>
  createServiceSchema.validate(body, options);

module.exports.updateServiceValidate = body =>
  updateServiceSchema.validate(body, options);

module.exports.emptyServiceValidate = body =>
  emptyServiceSchema.validate(body, options);
