const axios = require("axios");
const Order = require("../models/Order");
const ScheduledWash = require("../models/ScheduledWash");
const User = require("../models/User");
const { queryString } = require("../utils/queryString");
const { paginatedResults } = require("../utils/paginatedResults");
const {
  createScheduledWashValidate,
  updateScheduledWashValidate,
  updateStatusScheduledWashValidate,
  emptyScheduledWashValidate,
} = require("../validation/scheduledWash");
require("dotenv").config();

exports.create = async (req, res) => {
  const { error } = createScheduledWashValidate(req.body);
  if (error)
    return res.status(400).send({
      message: error.details[0].message,
      status: "error",
    });

  const order = await Order.findById(req.body.order);
  if (!order)
    return res.status(404).send({
      message: "Order doesn't exist",
      status: "error",
    });

  let scheduledWashServices = req.body.services.filter(
    ss =>
      ss.count > 0 &&
      order.userServices.find(
        us => String(ss.service) === String(us.service) && us.count > 0
      )
  );

  const scheduledWash = new ScheduledWash({
    ...req.body,
    services: scheduledWashServices,
    createdBy: req.user._id,
  });
  try {
    await scheduledWash.save();
    res.status(201).send({
      data: scheduledWash,
      message: "ScheduledWash successfully created",
      status: "success",
    });
  } catch (error) {
    console.log("==============================");
    console.log({ error });
    res.status(error.status || 500).send({
      message: "Something went wrong. please try again later",
      status: "error",
    });
  }
};

exports.findAll = async (req, res) => {
  const { error } = emptyScheduledWashValidate(req.body);
  if (error)
    return res.status(400).send({
      message: error.details[0].message,
      status: "error",
    });

  try {
    const scheduledWashs = await ScheduledWash.find(queryString(req));
    res.status(200).send({
      data: scheduledWashs,
      message: "ScheduledWashs successfully fetched",
      status: "success",
    });
  } catch (error) {
    res.status(error.status || 500).send({
      message: "Something went wrong. please try again later",
      status: "error",
    });
  }
};
exports.find = async (req, res) => {
  const { error } = emptyScheduledWashValidate(req.body);
  if (error)
    return res.status(400).send({
      message: error.details[0].message,
      status: "error",
    });

  try {
    const paginationQuery = await paginatedResults(req, ScheduledWash);
    const scheduledWashs = await ScheduledWash.find(queryString(req))
      .populate({ path: "cars.carId" })
      .limit(paginationQuery.pagination.limit)
      .skip(paginationQuery.startIndex)
      .sort({ createdAt: -1 })
      .exec();

    res.status(200).send({
      pagination: {
        ...paginationQuery.pagination,
        count: scheduledWashs.length,
      },
      data: scheduledWashs,
      message: "ScheduledWashs successfully fetched",
      status: "success",
    });
  } catch (error) {
    console.log({ error });
    res.status(error.status || 500).send({
      message: "Something went wrong. please try again later",
      status: "error",
    });
  }
};

exports.findOne = async (req, res) => {
  const { error } = emptyScheduledWashValidate(req.body);
  if (error)
    return res.status(400).send({
      message: error.details[0].message,
      status: "error",
    });

  try {
    const scheduledWash = await ScheduledWash.findById(req.params.id).populate(
      "cars.carId"
    );
    if (!scheduledWash)
      return res.status(404).send({
        message: "ScheduledWash doesn't exist",
        status: "error",
      });

    res.status(200).send({
      data: scheduledWash,
      message: "ScheduledWash successfully fetched",
      status: "success",
    });
  } catch (error) {
    res.status(error.status || 500).send({
      message: "Something went wrong. please try again later",
      status: "error",
    });
  }
};

exports.update = async (req, res) => {
  const { error } = updateScheduledWashValidate(req.body);
  if (error)
    return res.status(400).send({
      message: error.details[0].message,
      status: "error",
    });

  try {
    const scheduledWash = await ScheduledWash.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );
    if (!scheduledWash)
      return res.status(404).send({
        message: "ScheduledWash doesn't exist",
        status: "error",
      });

    const user = await User.findById(scheduledWash.createdBy);
    if (!user)
      return res.status(404).send({
        message: "User doesn't exist",
        status: "error",
      });

    const message = {
      to: user.pushToken,
      sound: "default",
      title: req.body.notification.title,
      subTitle: req.body.notification.subTitle,
      body: req.body.notification.body,
      data: { date: new Date() },
    };

    if (user.pushToken !== null && typeof user.pushToken !== "undefined") {
      await axios
        .post("https://exp.host/--/api/v2/push/send", message, {
          headers: {
            Accept: "application/json",
            "Accept-encoding": "gzip, deflate",
            "Content-Type": "application/json",
          },
        })
        .then(res => {
          // console.log('RESPONSE RECEIVED: ', res);
        })
        .catch(err => {
          console.log("AXIOS ERROR: ", err);
        });
    }

    res.status(200).send({
      data: scheduledWash,
      message: "ScheduledWash successfully updated",
      status: "success",
    });
  } catch (error) {
    console.log({ error });
    res.status(error.status || 500).send({
      message: "Something went wrong. please try again later",
      status: "error",
    });
  }
};

// exports.updateStatus = async (req, res) => {
//   const { error } = updateStatusScheduledWashValidate(req.body);
//   if (error)
//     return res.status(400).send({
//       message: error.details[0].message,
//       status: 'error',
//     });

//   try {
//     const scheduledWash = await ScheduledWash.findByIdAndUpdate(
//       req.params.id,
//       { status: req.params.status },
//       {
//         new: true,
//       }
//     ).populate('car');
//     if (!scheduledWash)
//       return res.status(404).send({
//         message: "ScheduledWash doesn't exist",
//         status: 'error',
//       });

//     const user = await User.findById(scheduledWash.createdBy);
//     if (!user)
//       return res.status(404).send({
//         message: "User doesn't exist",
//         status: 'error',
//       });

//     const message = {
//       to: user.pushToken,
//       sound: 'default',
//       title: req.body.notification.title,
//       subTitle: req.body.notification.subTitle,
//       body: req.body.notification.body,
//       data: { date: new Date() },
//     };

//     if (user.pushToken !== null && typeof user.pushToken !== 'undefined') {
//       await axios
//         .post('https://exp.host/--/api/v2/push/send', message, {
//           headers: {
//             Accept: 'application/json',
//             'Accept-encoding': 'gzip, deflate',
//             'Content-Type': 'application/json',
//           },
//         })
//         .then(res => {
//           // console.log('RESPONSE RECEIVED: ', res);
//         })
//         .catch(err => {
//           console.log('AXIOS ERROR: ', err);
//         });
//     }

//     if (req.params.status === 'rejected' || req.params.status === 'notFound') {
//       let order = await Order.findById(scheduledWash.order);
//       let services = order.userServices;
//       let scheduledServices = scheduledWash.services;

//       let returnScheduledServices = services.map(ss =>
//         scheduledServices.find(us => String(ss.service) === String(us.service))
//           ? {
//               _id: ss._id,
//               service: ss.service,
//               count:
//                 ss.count +
//                 scheduledServices.find(
//                   us => String(ss.service) === String(us.service)
//                 ).count,
//             }
//           : ss
//       );

//       order.userServices = returnScheduledServices;
//       await order.save();
//       const scheduledWashRejected = await ScheduledWash.findByIdAndDelete(
//         req.params.id
//       ).populate('car');

//       res.status(200).send({
//         data: scheduledWashRejected,
//         message: 'ScheduledWash successfully rejected and deleted',
//         status: 'success',
//       });
//     }

//     res.status(200).send({
//       data: scheduledWash,
//       message: 'ScheduledWash successfully updated',
//       status: 'success',
//     });
//   } catch (error) {
//     console.log({ error });
//     res.status(error.status || 500).send({
//       message: 'Something went wrong. please try again later',
//       status: 'error',
//     });
//   }
// };

exports.delete = async (req, res) => {
  const { error } = emptyScheduledWashValidate(req.body);
  if (error)
    return res.status(400).send({
      message: error.details[0].message,
      status: "error",
    });

  try {
    const scheduledWash = await ScheduledWash.findByIdAndDelete(
      req.params.id
    ).populate("car");
    if (!scheduledWash)
      return res.status(404).send({
        message: "ScheduledWash doesn't exist",
        status: "error",
      });

    res.status(200).send({
      data: scheduledWash,
      message: "ScheduledWash successfully deleted",
      status: "success",
    });
  } catch (error) {
    res.status(error.status || 500).send({
      message: "Something went wrong. please try again later",
      status: "error",
    });
  }
};
