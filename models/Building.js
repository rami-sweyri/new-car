const mongoose = require('mongoose');

const schema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 255,
    },
    label: {
      type: String,
      minlength: 3,
      maxlength: 255,
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

const Building = mongoose.model('Building', schema);
module.exports = Building;
