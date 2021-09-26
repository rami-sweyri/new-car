const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

const options = {
  errors: {
    wrap: {
      label: "",
    },
  },
};

// const createOrderSchema = Joi.object({
//   name: Joi.string().min(3).max(255).required(),
//   type: Joi.string().valid('oneTime', 'plan').required(),
//   price: Joi.number().required(),
//   plan: Joi.objectId(),
//   services: Joi.array().items(
//     Joi.object({
//       count: Joi.number(),
//       service: Joi.objectId(),
//     })
//   ),
// });

const createOrderSchema = Joi.object().keys({
  type: Joi.string().valid("oneTime", "plan").required(),
  price: Joi.number().required(),
  cars: Joi.array().items(
    Joi.object({
      services: Joi.array().items(
        Joi.object({
          count: Joi.number(),
          service: Joi.objectId(),
          days: Joi.array().items(Joi.number()),
        })
      ),
      days: Joi.array().items(Joi.number()),
      carId: Joi.objectId(),
    })
  ),
  plan: Joi.objectId(),
  date: Joi.string(),
});

const updateOrderSchema = Joi.object({
  type: Joi.string().valid("oneTime", "plan"),
  price: Joi.number(),
  plan: Joi.objectId(),
  cars: Joi.array().items(
    Joi.object({
      services: Joi.array().items(
        Joi.object({
          count: Joi.number(),
          service: Joi.objectId(),
        })
      ),
      days: Joi.array().items(Joi.number()),
      carId: Joi.objectId(),
    })
  ),
  date: Joi.string(),
  _id: Joi.objectId(),
});

const emptyOrderSchema = Joi.object({});

module.exports.createOrderValidate = body =>
  createOrderSchema.validate(body, options);

module.exports.updateOrderValidate = body =>
  updateOrderSchema.validate(body, options);

module.exports.emptyOrderValidate = body =>
  emptyOrderSchema.validate(body, options);
