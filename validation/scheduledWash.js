const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);

const options = {
  errors: {
    wrap: {
      label: '',
    },
  },
};

const createScheduledWashSchema = Joi.object({
  cars: Joi.array().items(
    Joi.object({
      carId: Joi.objectId(),
      _id: Joi.objectId(),
      services: Joi.array().items(
        Joi.object({
          count: Joi.number(),
          service: Joi.objectId(),
          _id: Joi.objectId(),
          status: Joi.string().valid(
            'rejected',
            'pending',
            'accepted',
            'notFound',
            'progress',
            'completed'
          ),
        })
      ),
    })
  ),
  type: Joi.string().valid('oneTime', 'plan').required(),
  date: Joi.string(),
  order: Joi.objectId().required(),
});

const updateScheduledWashSchema = Joi.object({
  cars: Joi.array().items(
    Joi.object({
      carId: Joi.objectId(),
      _id: Joi.objectId(),
      services: Joi.array().items(
        Joi.object({
          count: Joi.number(),
          service: Joi.objectId(),
          _id: Joi.objectId(),
          status: Joi.string().valid(
            'rejected',
            'pending',
            'accepted',
            'notFound',
            'progress',
            'completed'
          ),
        })
      ),
    })
  ),
  type: Joi.string().valid('oneTime', 'plan'),
  date: Joi.string(),
  _id: Joi.objectId(),
  order: Joi.objectId(),
  status: Joi.string().valid(
    'rejected',
    'pending',
    'accepted',
    'notFound',
    'progress',
    'completed'
  ),
  notification: Joi.object({
    title: Joi.string().min(3).max(255),
    subTitle: Joi.string().min(3).max(255),
    body: Joi.string().min(3).max(1255),
  }),
});

const updateStatusScheduledWashSchema = Joi.object({
  status: Joi.string().valid(
    'rejected',
    'pending',
    'accepted',
    'notFound',
    'progress',
    'completed'
  ),
  notification: Joi.object({
    title: Joi.string().min(3).max(255),
    subTitle: Joi.string().min(3).max(255),
    body: Joi.string().min(3).max(1255),
  }),
  _id: Joi.objectId(),
});

const emptyScheduledWashSchema = Joi.object({});

module.exports.createScheduledWashValidate = body =>
  createScheduledWashSchema.validate(body, options);

module.exports.updateScheduledWashValidate = body =>
  updateScheduledWashSchema.validate(body, options);

module.exports.updateStatusScheduledWashValidate = body =>
  updateStatusScheduledWashSchema.validate(body, options);

module.exports.emptyScheduledWashValidate = body =>
  emptyScheduledWashSchema.validate(body, options);
