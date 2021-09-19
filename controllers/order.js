const { default: axios } = require("axios");
const Order = require("../models/Order");
const Plan = require("../models/Plan");
const bcrypt = require("bcryptjs");
const randomize = require("randomatic");
const { paginatedResults } = require("../utils/paginatedResults");
const { queryString } = require("../utils/queryString");
const {
  createOrderValidate,
  updateOrderValidate,
  emptyOrderValidate,
} = require("../validation/order");
require("dotenv").config();

exports.create = async (req, res) => {
  const { error } = createOrderValidate(req.body);
  if (error)
    return res.status(400).send({
      message: error.details[0].message,
      status: "error",
    });

  if (req.body.type === "plan" && typeof req.body.plan === "undefined")
    return res.status(400).send({
      message: "Plan are required",
      status: "error",
    });

  // if (req.body.type === 'oneTime' && typeof req.body.services === 'undefined')
  //   return res.status(400).send({
  //     message: 'Services are required',
  //     status: 'error',
  //   });

  if (req.body.type === "oneTime" && typeof req.body.plan !== "undefined")
    return res.status(400).send({
      message: "Plan not allowed",
      status: "error",
    });

  //   if (req.body.type === 'oneTime' && typeof req.body.car === 'undefined')
  //     return res.status(400).send({
  //       message: 'Car are required',
  //       status: 'error',
  //     });

  //   if (req.body.type === 'oneTime' && typeof req.body.date === 'undefined')
  //     return res.status(400).send({
  //       message: 'Date are required',
  //       status: 'error',
  //     });

  const salt = await bcrypt.genSalt(10);
  const confirmationCode = randomize("0", 6);
  const hashedCode = await bcrypt.hash(confirmationCode, salt);

  const order = new Order({
    ...req.body,
    createdBy: req.user._id,
    code: hashedCode,
  });
  console.log({ order });

  try {
    const resp = await axios.post(
      "https://secure.telr.com/gateway/order.json",
      {
        method: "create",
        store: process.env.TELR_STORE_ID,
        authkey: process.env.TELR_STORE_AUTHKEY,
        order: {
          cartid: order._id,
          test: "1",
          amount: order.price,
          currency: "AED",
          description: order.type,
          trantype: "ecom",
        },
        customer: {
          ref: req.user._id,
          email: req.user.email,
          name: {
            forenames: req.user.firstName,
            surname: req.user.lastName,
          },
          phone: req.user.phone,
        },
        return: {
          authorised: `${
            req.protocol + "://" + req.get("host")
          }/api/payment/authorised/${order._id}/${confirmationCode}`,
          declined: `${
            req.protocol + "://" + req.get("host")
          }/api/payment/declined/${order._id}`,
          cancelled: `${
            req.protocol + "://" + req.get("host")
          }/api/payment/cancelled/${order._id}`,
        },
      }
    );

    order.ref = resp.data.order.ref;
    order.trace = resp.data.trace;
    await order.save();
    res.status(201).send({
      data: {
        ref: resp.data.order.ref,
        url: resp.data.order.url,
        trace: resp.data.trace,
        status: order.status,
        trash: order.trash,
        _id: order._id,
        name: order.name,
        price: order.price,
        type: order.type,
        cars: order.cars,
        plan: order.plan,
        expirationDate: order.expirationDate,
        createdBy: order.createdBy,
        createdAt: order.createdAt,
        updatedAt: order.updatedAt,
      },

      message: "Order successfully created",
      status: "success",
    });

    // await order.save();
    // res.status(200).send({
    //   data: order,
    //   message: 'Orders successfully fetched',
    //   status: 'success',
    // });
  } catch (error) {
    console.log({ error });
    res.status(error.status || 500).send({
      message: "Something went wrong. please try again later",
      status: "error",
    });
  }
};
// exports.create = async (req, res) => {
//   const { error } = createOrderValidate(req.body);
//   if (error)
//     return res.status(400).send({
//       message: error.details[0].message,
//       status: 'error',
//     });

//   if (req.body.type === 'plan' && typeof req.body.plan === 'undefined')
//     return res.status(400).send({
//       message: 'Plan are required',
//       status: 'error',
//     });

//   if (req.body.type === 'oneTime' && typeof req.body.services === 'undefined')
//     return res.status(400).send({
//       message: 'Services are required',
//       status: 'error',
//     });

//   if (req.body.type === 'oneTime' && typeof req.body.plan !== 'undefined')
//     return res.status(400).send({
//       message: 'Plan not allowed',
//       status: 'error',
//     });

//   if (req.body.type === 'oneTime' && typeof req.body.car === 'undefined')
//     return res.status(400).send({
//       message: 'Car are required',
//       status: 'error',
//     });

//   if (req.body.type === 'oneTime' && typeof req.body.date === 'undefined')
//     return res.status(400).send({
//       message: 'Date are required',
//       status: 'error',
//     });

//   const order = new Order({ ...req.body, createdBy: req.user._id });
//   // console.log({
//   //   protocol: req.protocol,
//   //   host: req.get('host'),
//   //   pathname: req.originalUrl,
//   // });
//   try {
//     const resp = await axios.post(
//       'https://secure.telr.com/gateway/order.json',
//       {
//         method: 'create',
//         store: process.env.TELR_STORE_ID,
//         authkey: process.env.TELR_STORE_AUTHKEY,
//         order: {
//           cartid: order._id,
//           test: '1',
//           amount: order.price,
//           currency: 'AED',
//           description: order.type,
//           trantype: 'ecom',
//         },
//         customer: {
//           ref: req.user._id,
//           email: req.user.email,
//           name: {
//             forenames: req.user.firstName,
//             surname: req.user.lastName,
//           },
//           phone: req.user.phone,
//         },
//         return: {
//           authorised: `${
//             req.protocol + '://' + req.get('host')
//           }/api/payment/authorised/${order._id}`,
//           declined: `${
//             req.protocol + '://' + req.get('host')
//           }/api/payment/declined/${order._id}`,
//           cancelled: `${
//             req.protocol + '://' + req.get('host')
//           }/api/payment/cancelled/${order._id}`,
//         },
//       }
//     );

//     order.ref = resp.data.order.ref;
//     order.trace = resp.data.trace;
//     await order.save();
//     // console.log({ resp });
//     res.status(201).send({
//       data: {
//         ref: resp.data.order.ref,
//         url: resp.data.order.url,
//         trace: resp.data.trace,
//         status: order.status,
//         trash: order.trash,
//         _id: order._id,
//         name: order.name,
//         price: order.price,
//         type: order.type,
//         services: order.services,
//         createdBy: order.createdBy,
//         createdAt: order.createdAt,
//         updatedAt: order.updatedAt,
//       },
//       message: 'Order successfully created',
//       status: 'success',
//     });
//     // axios.post('https://secure.telr.com/gateway/order.json').then(
//     //   response => {
//     //     console.log(response);

//     //     res.status(201).send({
//     //       data: { ...response.data, order },
//     //       message: 'Order successfully created',
//     //       status: 'success',
//     //     });
//     //   },
//     //   error => {
//     //     console.log(error);
//     //   }
//     // );
//   } catch (error) {
//     console.log({ error });
//     res.status(error.status || 500).send({
//       message: 'Something went wrong. please try again later',
//       status: 'error',
//     });
//   }
// };

exports.findAll = async (req, res) => {
  const { error } = emptyOrderValidate(req.body);
  if (error)
    return res.status(400).send({
      message: error.details[0].message,
      status: "error",
    });

  try {
    const orders = await Order.find(queryString(req));
    res.status(200).send({
      data: orders,
      message: "Orders successfully fetched",
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
  const { error } = emptyOrderValidate(req.body);
  if (error)
    return res.status(400).send({
      message: error.details[0].message,
      status: "error",
    });

  try {
    const paginationQuery = await paginatedResults(req, Order);
    const orders = await Order.find(queryString(req))
      .limit(paginationQuery.pagination.limit)
      .skip(paginationQuery.startIndex)
      .sort({ createdAt: -1 })
      .exec();

    res.status(200).send({
      pagination: { ...paginationQuery.pagination, count: orders.length },
      data: orders,
      message: "Orders successfully fetched",
      status: "success",
    });
  } catch (error) {
    res.status(error.status || 500).send({
      message: "Something went wrong. please try again later",
      status: "error",
    });
  }
};

exports.findMe = async (req, res) => {
  const { error } = emptyOrderValidate(req.body);
  if (error)
    return res.status(400).send({
      message: error.details[0].message,
      status: "error",
    });

  try {
    const orders = await Order.find()
      .where("createdBy")
      .in([req.user._id])
      .populate("plan")
      .populate("cars.userServices.service");

    res.status(200).send({
      data: orders,
      message: "Orders successfully fetched",
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
  const { error } = emptyOrderValidate(req.body);
  if (error)
    return res.status(400).send({
      message: error.details[0].message,
      status: "error",
    });

  try {
    const order = await Order.findById(req.params.id);
    if (!order)
      return res.status(404).send({
        message: "Order doesn't exist",
        status: "error",
      });

    res.status(200).send({
      data: order,
      message: "Order successfully fetched",
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
  const { error } = updateOrderValidate(req.body);
  if (error)
    return res.status(400).send({
      message: error.details[0].message,
      status: "error",
    });

  try {
    const order = await Order.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!order)
      return res.status(404).send({
        message: "Order doesn't exist",
        status: "error",
      });

    res.status(200).send({
      data: order,
      message: "Order successfully updated",
      status: "success",
    });
  } catch (error) {
    res.status(error.status || 500).send({
      message: "Something went wrong. please try again later",
      status: "error",
    });
  }
};

exports.delete = async (req, res) => {
  const { error } = emptyOrderValidate(req.body);
  if (error)
    return res.status(400).send({
      message: error.details[0].message,
      status: "error",
    });

  try {
    const order = await Order.findByIdAndDelete(req.params.id);
    if (!order)
      return res.status(404).send({
        message: "Order doesn't exist",
        status: "error",
      });

    res.status(200).send({
      data: order,
      message: "Order successfully deleted",
      status: "success",
    });
  } catch (error) {
    res.status(error.status || 500).send({
      message: "Something went wrong. please try again later",
      status: "error",
    });
  }
};
