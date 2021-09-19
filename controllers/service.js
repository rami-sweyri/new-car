const Service = require('../models/Service');
const { paginatedResults } = require('../utils/paginatedResults');
const { queryString } = require('../utils/queryString');
const {
  createServiceValidate,
  emptyServiceValidate,
  updateServiceValidate,
} = require('../validation/service');

exports.create = async (req, res) => {
  const { error } = createServiceValidate(req.body);
  if (error)
    return res.status(400).send({
      error: error.details[0].message,
    });

  const service = new Service(req.body);
  try {
    await service.save();
    res.status(201).send({
      data: service,
      message: 'Service successfully created',
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
  const { error } = emptyServiceValidate(req.body);
  if (error)
    return res.status(400).send({
      message: error.details[0].message,
      status: 'error',
    });
  try {
    const services = await Service.find(queryString(req));
    res.status(200).send({
      data: services,
      message: 'Services successfully fetched',
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
  const { error } = emptyServiceValidate(req.body);
  if (error)
    return res.status(400).send({
      message: error.details[0].message,
      status: 'error',
    });
  try {
    const paginationQuery = await paginatedResults(req, Service);
    const services = await Service.find(queryString(req))
      .limit(paginationQuery.pagination.limit)
      .skip(paginationQuery.startIndex)
      .sort({ createdAt: -1 })
      .exec();

    res.status(200).send({
      pagination: { ...paginationQuery.pagination, count: services.length },
      data: services,
      message: 'Services successfully fetched',
      status: 'success',
    });
  } catch (error) {
    res.status(error.status || 500).send({
      message: 'Something went wrong. please try again later',
      status: 'error',
    });
  }
};

exports.findOne = async (req, res) => {
  const { error } = emptyServiceValidate(req.body);
  if (error)
    return res.status(400).send({
      message: error.details[0].message,
      status: 'error',
    });
  try {
    const service = await Service.findById(req.params.id);
    if (!service)
      return res.status(404).send({
        message: "Service doesn't exist",
        status: 'error',
      });
    res.status(200).send({
      data: service,
      message: 'Service successfully fetched',
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
  const { error } = updateServiceValidate(req.body);
  if (error)
    return res.status(400).send({
      message: error.details[0].message,
      status: 'error',
    });
  try {
    const service = await Service.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!service)
      return res.status(404).send({
        message: "Service doesn't exist",
        status: 'error',
      });

    res.status(200).send({
      data: service,
      message: 'Service successfully updated',
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
  const { error } = emptyServiceValidate(req.body);
  if (error)
    return res.status(400).send({
      message: error.details[0].message,
      status: 'error',
    });

  try {
    const service = await Service.findByIdAndDelete(req.params.id);
    if (!service) {
      return res.status(404).send({
        message: "Service doesn't exist",
        status: 'error',
      });
    }
    res.status(200).send({
      data: service,
      message: 'Service successfully deleted',
      status: 'success',
    });
  } catch (error) {
    res.status(error.status || 500).send({
      message: 'Something went wrong. please try again later',
      status: 'error',
    });
  }
};
