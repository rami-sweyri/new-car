const mongoose = require('mongoose');
const Order = require('./Order');
const User = require('./User');

const schema = new mongoose.Schema(
  {
    cars: [
      {
        carId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Car',
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
            status: {
              type: String,
              enum: [
                'rejected',
                'pending',
                'accepted',
                'notFound',
                'progress',
                'completed',
              ],
              default: 'pending',
            },
          },
        ],
      },
    ],
    type: {
      type: String,
      required: true,
      enum: ['oneTime', 'plan'],
    },
    order: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Order',
    },
    date: {
      type: Date,
      default: () => new Date(+new Date() + 7 * 24 * 60 * 60 * 1000),
    },
    day: {
      type: Number,
    },
    status: {
      type: String,
      enum: [
        'rejected',
        'pending',
        'accepted',
        'notFound',
        'progress',
        'completed',
      ],
      default: 'pending',
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

schema.pre('save', async function preSaveFunction(error, doc, next) {
  let currentDay = new Date().getDay();

  let scheduledWash = this;
  let order = await Order.findById(scheduledWash.order);

  let data = scheduledWash.cars.map(car =>
    car.services.map(service => {
      return {
        service: service.service,
        count: service.count,
        carId: car.carId,
        day: scheduledWash.day,
      };
    })
  );
  data = [].concat.apply([], data);

  const results = order.cars.map(car => {
    return {
      carId: car.carId,
      days: car.days,
      _id: car._id,
      services: car.services,
      userServices: car.userServices.map(userService => {
        return {
          days: userService.days,
          _id: userService._id,
          service: userService.service,
          count: data.find(
            d =>
              String(d.service) == String(userService.service) &&
              String(d.carId) == String(car.carId) &&
              userService.days.includes(d.day) &&
              userService.days.includes(currentDay) &&
              userService.count > 0
          )
            ? userService.count - 1
            : userService.count,
        };
      }),
    };
  });

  // let result = await order.cars.map(car => {
  //  if(){

  //  }else {

  //  }
  // });
  // console.log({ cars: order.cars, result: JSON.stringify(result) });

  // let result = await order.cars.map(async car => {
  //   if (String(car.carId) == String(scheduledWash.car)) {
  //     return {
  //       _id: car._id,
  //       services: car.services,
  //       carId: car.carId,
  //       days: car.days,
  //       userServices: car.userServices.map(userService => {
  //         if (
  //           String(userService.service) ==
  //             String(scheduledWash.service.serviceId) &&
  //           userService.days.includes(currentDay)
  //         ) {
  //           return {
  //             days: userService.days,
  //             service: userService.service,
  //             _id: userService._id,
  //             count: userService.count - 1,
  //           };
  //         } else {
  //           return {
  //             days: userService.days,
  //             service: userService.service,
  //             _id: userService._id,
  //             count: userService.count,
  //           };
  //         }
  //       }),
  //     };
  //   } else {
  //     return {
  //       _id: car._id,
  //       services: car.services,
  //       carId: car.carId,
  //       days: car.days,
  //       userServices: car.userServices,
  //     };
  //   }
  // });
  // let result = order.cars.map(car => {
  //   if (String(car.carId) === String(scheduledWash.car)) {
  //     return {
  //       _id: car._id,
  //       services: car.services,
  //       carId: car.carId,
  //       days: car.days,
  //       userServices: car.userServices.map(us => {
  //         let filtered = scheduledWash.services.filter(
  //           ss =>
  //             String(ss.service) === String(us.service) &&
  //             us.count > 0 &&
  //             us.days.includes(currentDay)
  //         );

  //         if (filtered.length > 0) {
  //           if (us.count > 0) {
  //             return {
  //               days: us.days,
  //               service: us.service,
  //               _id: us._id,
  //               count: us.count - 1,
  //             };
  //           } else {
  //             return {
  //               days: us.days,
  //               service: us.service,
  //               _id: us._id,
  //               count: us.count,
  //             };
  //           }
  //         } else {
  //           return {
  //             days: us.days,
  //             service: us.service,
  //             _id: us._id,
  //             count: us.count,
  //           };
  //         }
  //       }),
  //     };
  //   } else return car;
  // });

  await Order.findByIdAndUpdate(
    scheduledWash.order,
    { cars: results },
    {
      new: true,
    }
  );
  console.log({ result: JSON.stringify(results), data, scheduledWash });
  next();
});

const ScheduledWash = mongoose.model('ScheduledWash', schema);
module.exports = ScheduledWash;
