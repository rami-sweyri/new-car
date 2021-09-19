const mongoose = require('mongoose');

const schema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      required: true,
      minlength: 3,
      maxlength: 255,
    },
    label: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 255,
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

const Permission = mongoose.model('Permission', schema);
module.exports = Permission;
