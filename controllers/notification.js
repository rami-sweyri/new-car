const Notification = require('../models/Notification');
const { paginatedResults } = require('../utils/paginatedResults');
const { queryString } = require('../utils/queryString');
const {
  createNotificationValidate,
  updateNotificationValidate,
  emptyNotificationValidate,
} = require('../validation/notification');

exports.create = async (req, res) => {
  const { error } = createNotificationValidate(req.body);
  if (error)
    return res.status(400).send({
      message: error.details[0].message,
      status: 'error',
    });

  const notification = new Notification({
    ...req.body,
    data: { date: new Date() },
  });
  try {
    await notification.save();
    res.status(201).send({
      data: notification,
      message: 'Notification successfully created',
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

exports.findAll = async (req, res) => {
  const { error } = emptyNotificationValidate(req.body);
  if (error)
    return res.status(400).send({
      message: error.details[0].message,
      status: 'error',
    });

  try {
    const notifications = await Notification.find(queryString(req)).populate(
      'building'
    );
    res.status(200).send({
      data: notifications,
      message: 'Notifications successfully fetched',
      status: 'success',
    });
  } catch (error) {
    res.status(error.status || 500).send({
      message: 'Something went wrong. please try again later',
      status: 'error',
    });
  }
};
exports.find = async (req, res) => {
  const { error } = emptyNotificationValidate(req.body);
  if (error)
    return res.status(400).send({
      message: error.details[0].message,
      status: 'error',
    });

  try {
    const paginationQuery = await paginatedResults(req, Notification);

    const notifications = await Notification.find(queryString(req))
      .limit(paginationQuery.pagination.limit)
      .skip(paginationQuery.startIndex)
      .sort({ createdAt: -1 })
      .exec();

    res.status(200).send({
      pagination: {
        ...paginationQuery.pagination,
        notifications: users.length,
      },
      data: notifications,
      message: 'Notifications successfully fetched',
      status: 'success',
    });
  } catch (error) {
    res.status(error.status || 500).send({
      message: 'Something went wrong. please try again later',
      status: 'error',
    });
  }
};

exports.findMe = async (req, res) => {
  const { error } = emptyNotificationValidate(req.body);
  if (error)
    return res.status(400).send({
      message: error.details[0].message,
      status: 'error',
    });

  try {
    const notifications = await Notification.find()
      .where('createdBy')
      .in([req.user._id]);

    res.status(200).send({
      data: notifications,
      message: 'Notifications successfully fetched',
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

exports.findOne = async (req, res) => {
  const { error } = emptyNotificationValidate(req.body);
  if (error)
    return res.status(400).send({
      message: error.details[0].message,
      status: 'error',
    });

  try {
    const notification = await Notification.findById(req.params.id).populate(
      'building'
    );
    if (!notification)
      return res.status(404).send({
        message: "Notification doesn't exist",
        status: 'error',
      });

    res.status(200).send({
      data: notification,
      message: 'Notification successfully fetched',
      status: 'success',
    });
  } catch (error) {
    res.status(error.status || 500).send({
      message: 'Something went wrong. please try again later',
      status: 'error',
    });
  }
};

exports.update = async (req, res) => {
  const { error } = updateNotificationValidate(req.body);
  if (error)
    return res.status(400).send({
      message: error.details[0].message,
      status: 'error',
    });

  try {
    const notification = await Notification.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    ).populate('building');
    if (!notification)
      return res.status(404).send({
        message: "Notification doesn't exist",
        status: 'error',
      });

    res.status(200).send({
      data: notification,
      message: 'Notification successfully updated',
      status: 'success',
    });
  } catch (error) {
    res.status(error.status || 500).send({
      message: 'Something went wrong. please try again later',
      status: 'error',
    });
  }
};

exports.delete = async (req, res) => {
  const { error } = emptyNotificationValidate(req.body);
  if (error)
    return res.status(400).send({
      message: error.details[0].message,
      status: 'error',
    });

  try {
    const notification = await Notification.findByIdAndDelete(
      req.params.id
    ).populate('building');
    if (!notification)
      return res.status(404).send({
        message: "Notification doesn't exist",
        status: 'error',
      });

    res.status(200).send({
      data: notification,
      message: 'Notification successfully deleted',
      status: 'success',
    });
  } catch (error) {
    res.status(error.status || 500).send({
      message: 'Something went wrong. please try again later',
      status: 'error',
    });
  }
};

exports.deleteMe = async (req, res) => {
  const { error } = emptyNotificationValidate(req.body);
  if (error)
    return res.status(400).send({
      message: error.details[0].message,
      status: 'error',
    });

  try {
    const notification = await Notification.deleteMany({
      createdBy: req.user._id,
    });
    if (!notification)
      return res.status(404).send({
        message: "Notification doesn't exist",
        status: 'error',
      });

    res.status(200).send({
      data: notification,
      message: 'Notification successfully deleted',
      status: 'success',
    });
  } catch (error) {
    res.status(error.status || 500).send({
      message: 'Something went wrong. please try again later',
      status: 'error',
    });
  }
};
