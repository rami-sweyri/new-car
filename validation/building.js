const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);

const options = {
  errors: {
    wrap: {
      label: '',
    },
  },
};

const createBuildingSchema = Joi.object({
  name: Joi.string().min(3).max(255).required(),
  label: Joi.string().min(3).max(255),
  description: Joi.string().min(3).max(1255),
});

const updateBuildingSchema = Joi.object({
  name: Joi.string().min(3).max(255),
  label: Joi.string().min(3).max(255),
  description: Joi.string().min(3).max(1255),
  _id: Joi.objectId(),
});

const emptyBuildingSchema = Joi.object({});

module.exports.createBuildingValidate = body =>
  createBuildingSchema.validate(body, options);

module.exports.updateBuildingValidate = body =>
  updateBuildingSchema.validate(body, options);

module.exports.emptyBuildingValidate = body =>
  emptyBuildingSchema.validate(body, options);
