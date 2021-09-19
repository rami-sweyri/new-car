const Order = require('../models/Order');
const User = require('../models/User');
const ScheduledWash = require('../models/ScheduledWash');

const { emptyStatisticValidate } = require('../validation/statistic');
exports.findAll = async (req, res) => {
  const { error } = emptyStatisticValidate(req.body);
  if (error)
    return res.status(400).send({
      message: error.details[0].message,
      status: 'error',
    });
  try {
    const users = await User.find();
    const orders = await Order.find();
    const scheduledWashes = await ScheduledWash.find();
    // enum: ['oneTime', 'plan'],
    // enum: ['rejected', 'pending', 'active'],

    let statistics = {
      users: {
        total: users.length,
        rejected: users.filter(data => data.status === 'rejected').length,
        pending: users.filter(data => data.status === 'pending').length,
        active: users.filter(data => data.status === 'active').length,
      },
      orders: {
        total: orders.length,
        oneTime: orders.filter(data => data.type === 'oneTime').length,
        plan: orders.filter(data => data.type === 'plan').length,

        rejected: orders.filter(data => data.status === 'rejected').length,
        pending: orders.filter(data => data.status === 'pending').length,
        active: orders.filter(data => data.status === 'active').length,

        // oneTimeRejected: orders.filter(
        //   data => data.status === 'rejected' && data.type === 'oneTime'
        // ).length,
        // oneTimePending: orders.filter(
        //   data => data.status === 'pending' && data.type === 'oneTime'
        // ).length,
        // oneTimeActive: orders.filter(
        //   data => data.status === 'active' && data.type === 'oneTime'
        // ).length,

        // planRejected: orders.filter(
        //   data => data.status === 'rejected' && data.type === 'plan'
        // ).length,
        // planPending: orders.filter(
        //   data => data.status === 'pending' && data.type === 'plan'
        // ).length,
        // planActive: orders.filter(
        //   data => data.status === 'active' && data.type === 'plan'
        // ).length,
      },
      scheduledWashes: {
        total: scheduledWashes.length,
        oneTime: scheduledWashes.filter(data => data.type === 'oneTime').length,
        plan: scheduledWashes.filter(data => data.type === 'plan').length,

        rejected: scheduledWashes.filter(data => data.status === 'rejected')
          .length,
        pending: scheduledWashes.filter(data => data.status === 'pending')
          .length,
        accepted: scheduledWashes.filter(data => data.status === 'accepted')
          .length,
        notFound: scheduledWashes.filter(data => data.status === 'notFound')
          .length,
        progress: scheduledWashes.filter(data => data.status === 'progress')
          .length,
        completed: scheduledWashes.filter(data => data.status === 'completed')
          .length,
      },
    };
    console.log({ statistics });

    res.status(200).send({
      statistics: statistics,
      message: 'Statistics successfully fetched',
      status: 'success',
    });
  } catch (error) {
    console.log({ error });
    res.status(error.status || 500).send({
      message: 'Something went wrong. please try again later',
      status: 'error',
    });
  }
};
