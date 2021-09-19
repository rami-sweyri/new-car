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
    buildings: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Building',
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

const City = mongoose.model('City', schema);
module.exports = City;
