const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);

const options = {
  errors: {
    wrap: {
      label: '',
    },
  },
};

const createPermissionSchema = Joi.object({
  name: Joi.string().min(3).max(255).required(),
  label: Joi.string().min(3).max(255).required(),
});

const updatePermissionSchema = Joi.object({
  name: Joi.string().min(3).max(255),
  label: Joi.string().min(3).max(255),
  _id: Joi.objectId(),
});

const emptyPermissionSchema = Joi.object({});

module.exports.createPermissionValidate = body =>
  createPermissionSchema.validate(body, options);

module.exports.updatePermissionValidate = body =>
  updatePermissionSchema.validate(body, options);

module.exports.emptyPermissionValidate = body =>
  emptyPermissionSchema.validate(body, options);
