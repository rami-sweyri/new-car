const mongoose = require('mongoose');
const User = require('./User');
const Plan = require('./Plan');
const Service = require('./Service');
const { calculateService } = require('../utils/calculateService');

const schema = new mongoose.Schema(
  {
    price: {
      type: Number,
    },
    plan: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Plan',
    },
    status: {
      type: String,
      enum: ['declined', 'pending', 'cancelled', 'active'],
      default: 'pending',
    },
    cars: [
      {
        carId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Car',
        },
        days: [
          {
            type: Number,
            enum: [0, 1, 2, 3, 4, 5, 6],
          },
        ],
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
        userServices: [
          {
            count: {
              type: Number,
            },
            service: {
              type: mongoose.Schema.Types.ObjectId,
              ref: 'Service',
            },
            days: [
              {
                type: Number,
                enum: [0, 1, 2, 3, 4, 5, 6],
              },
            ],
          },
        ],
      },
    ],
    date: {
      type: Date,
      default: () => new Date(+new Date() + 7 * 24 * 60 * 60 * 1000),
    },
    ref: {
      type: String,
    },
    expirationDate: { type: Date },
    type: { type: String, enum: ['plan', 'oneTime'] },
    trace: {
      type: String,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    code: {
      type: String,
      required: true,
      unique: true,
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

schema.pre('save', async function preSaveFunction(error, doc, next) {
  if (this.status === 'active') {
    let order = this;
    console.log('=======================');
    console.log('set userServices to the order');
    console.log('=======================');
    let plan =
      typeof order.plan !== 'undefined'
        ? (await Plan.findById(order.plan)) !== null
          ? await Plan.findById(order.plan)
          : { services: [] }
        : { services: [] };

    let newCars = order.cars.map(car => ({
      carId: car.carId,
      days: car.days,
      services: car.services,
      userServices: calculateService(car, plan),
    }));
    console.log({ newCars });
    order.cars = newCars;
    function dateFromDay(day) {
      var date = new Date();
      return date.setDate(date.getDate() + day);
    }
    if (order.type === 'plan') {
      order.expirationDate = dateFromDay(plan.period);
    } else {
      order.expirationDate = dateFromDay(1);
    }

    next();
  }
});

const Order = mongoose.model('Order', schema);
module.exports = Order;
