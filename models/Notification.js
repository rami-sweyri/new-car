const mongoose = require('mongoose');

const schema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 255,
    },
    subTitle: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 255,
    },
    body: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 1255,
    },
    data: {
      date: { type: Date },
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
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

const Notification = mongoose.model('Notification', schema);
module.exports = Notification;
