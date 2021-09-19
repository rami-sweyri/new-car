const Joi = require('joi');

const options = {
  errors: {
    wrap: {
      label: '',
    },
  },
};

const emptyStatisticSchema = Joi.object({});

module.exports.emptyStatisticValidate = body =>
  emptyStatisticSchema.validate(body, options);
