const Joi = require('joi');

const options = {
  errors: {
    wrap: {
      label: '',
    },
  },
};

const emptyFileSchema = Joi.object({});

module.exports.emptyFileValidate = body =>
  emptyFileSchema.validate(body, options);
