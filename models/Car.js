const mongoose = require('mongoose');
const User = require('./User');

const schema = new mongoose.Schema(
  {
    maker: {
      type: String,
      required: true,

      minlength: 3,
      maxlength: 255,
    },
    model: {
      type: String,
      required: true,

      minlength: 3,
      maxlength: 255,
    },
    color: {
      type: String,
      required: true,

      minlength: 3,
      maxlength: 255,
    },
    year: {
      type: Number,
    },
    plate: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 255,
    },
    image: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'File',
    },
    parkingNumber: {
      type: String,
      minlength: 3,
      maxlength: 255,
    },
    building: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Building',
    },
    city: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'City',
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
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

// schema.pre('save', async function preSaveFunction(error, doc, next) {
//   if (error.name === 'MongoError' && error.code === 11000) {
//     next(new Error('There was a duplicate key error'));
//   } else {
//     let car = this;
//     let userId = car.createdBy;

//     const user = await User.findById(userId).select('-confirmationCode');

//     user.cars = user.cars.length > 0 ? [...user.cars, car._id] : [car._id];

//     await user.save();

//     next();
//   }
// });

const Car = mongoose.model('Car', schema);
module.exports = Car;
