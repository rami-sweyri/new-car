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
    extraAble: {
      type: Boolean,
      default: false,
    },
    price: {
      type: Number,
    },
    note: {
      type: String,
      minlength: 0,
      maxlength: 1255,
    },
    description: {
      type: String,
      minlength: 3,
      maxlength: 1255,
    },
    trash: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Service = mongoose.model('Service', schema);
module.exports = Service;
