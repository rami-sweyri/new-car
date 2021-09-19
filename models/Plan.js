const mongoose = require('mongoose');

const schema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      minlength: 3,
      maxlength: 255,
    },
    label: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 255,
    },
    period: { type: Number, required: true },
    image: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'File',
    },
    price: {
      type: Number,
    },
    note: {
      type: String,
      minlength: 3,
      maxlength: 1255,
    },
    description: {
      type: String,
      minlength: 3,
      maxlength: 1255,
    },
    services: [
      {
        count: {
          type: Number,
        },
        service: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Service',
        },
      },
    ],
    trash: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Plan = mongoose.model('Plan', schema);
module.exports = Plan;
