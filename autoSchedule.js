const cron = require("node-cron");
const Order = require("./models/Order");
const ScheduledWash = require("./models/ScheduledWash");

module.exports = cron.schedule("00 00 1 * * *", async () => {
  console.log("==============================");
  console.log("running a autoSchedule every 5 second");
  console.log("==============================");

  // let currentDay = new Date().getDay();
  let currentDay = new Date().getDay();

  const orders = await Order.find({
    type: { $in: ["plan"] },
    status: { $in: ["active"] },
    expirationDate: { $gte: new Date() },
    "cars.days": { $in: [currentDay] },
  });
  if (orders.length > 0) {
    try {
      await orders.map(async order => {
        const scheduledWash = new ScheduledWash({
          cars: order.cars
            .filter(car =>
              car.userServices.some(
                userService =>
                  userService.days.includes(currentDay) && userService.count > 0
              )
            )
            .map(car => {
              return {
                carId: car.carId,
                services: car.userServices
                  .filter(userService => userService.count > 0)
                  .filter(userService => userService.days.includes(currentDay))
                  .map(userService => {
                    return {
                      service: userService.service,
                      count: 1,
                    };
                  }),
              };
            }),
          type: "plan",
          day: currentDay,
          date: new Date().setHours(new Date().getHours() + 9),
          order: order._id,
          createdBy: order.createdBy,
        });
        if (scheduledWash.cars.length > 0) {
          await scheduledWash.save();
        }
      });
    } catch (error) {
      res.status(error.status || 500).send({
        message: "Something went wrong. please try again later",
        status: "error",
      });
    }
  } else {
    return;
  }
});
