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
    description: {
      type: String,
      minlength: 3,
      maxlength: 1255,
    },
    image: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'File',
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

const Intro = mongoose.model('Intro', schema);
module.exports = Intro;
