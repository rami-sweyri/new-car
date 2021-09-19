const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);

const options = {
  errors: {
    wrap: {
      label: '',
    },
  },
};

const createNotificationSchema = Joi.object({
  title: Joi.string().min(3).max(255).required(),
  subTitle: Joi.string().min(3).max(255).required(),
  body: Joi.string().min(3).max(1255).required(),
  createdBy: Joi.objectId(),
});

const updateNotificationSchema = Joi.object({
  title: Joi.string().min(3).max(255),
  subTitle: Joi.string().min(3).max(255),
  body: Joi.string().min(3).max(1255),
  createdBy: Joi.objectId(),
});

const emptyNotificationSchema = Joi.object({});

module.exports.createNotificationValidate = body =>
  createNotificationSchema.validate(body, options);

module.exports.updateNotificationValidate = body =>
  updateNotificationSchema.validate(body, options);

module.exports.emptyNotificationValidate = body =>
  emptyNotificationSchema.validate(body, options);
