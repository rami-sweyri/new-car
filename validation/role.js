const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);

const options = {
  errors: {
    wrap: {
      label: '',
    },
  },
};

const createRoleSchema = Joi.object({
  name: Joi.string().min(3).max(255).required(),
  label: Joi.string().min(3).max(255).required(),
  permissions: Joi.array().items(Joi.objectId()),
});

const updateRoleSchema = Joi.object({
  name: Joi.string().min(3).max(255),
  label: Joi.string().min(3).max(255),
  permissions: Joi.array().items(Joi.objectId()),
  _id: Joi.objectId(),
});

const emptyRoleSchema = Joi.object({});

module.exports.createRoleValidate = body =>
  createRoleSchema.validate(body, options);

module.exports.updateRoleValidate = body =>
  updateRoleSchema.validate(body, options);

module.exports.emptyRoleValidate = body =>
  emptyRoleSchema.validate(body, options);
