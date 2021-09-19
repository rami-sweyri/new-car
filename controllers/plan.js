const Plan = require('../models/Plan');
const { paginatedResults } = require('../utils/paginatedResults');
const { queryString } = require('../utils/queryString');
const {
  createPlanValidate,
  emptyPlanValidate,
  updatePlanValidate,
} = require('../validation/plan');

exports.create = async (req, res) => {
  const { error } = createPlanValidate(req.body);
  if (error)
    return res.status(400).send({
      error: error.details[0].message,
    });

  const plan = new Plan(req.body);
  try {
    await plan.save();
    res.status(201).send({
      data: plan,
      message: 'Plan successfully created',
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
exports.find = async (req, res) => {
  const { error } = emptyPlanValidate(req.body);
  if (error)
    return res.status(400).send({
      message: error.details[0].message,
      status: 'error',
    });
  try {
    const paginationQuery = await paginatedResults(req, Plan);
    const plans = await Plan.find(queryString(req))
      .populate('services.service')
      .limit(paginationQuery.pagination.limit)
      .skip(paginationQuery.startIndex)
      .sort({ createdAt: -1 })
      .exec();

    res.status(200).send({
      pagination: { ...paginationQuery.pagination, count: plans.length },
      data: plans,
      message: 'Plans successfully fetched',
      status: 'success',
    });
  } catch (error) {
    res.status(error.status || 500).send({
      message: 'Something went wrong. please try again later',
      status: 'error',
    });
  }
};

exports.findAll = async (req, res) => {
  const { error } = emptyPlanValidate(req.body);
  if (error)
    return res.status(400).send({
      message: error.details[0].message,
      status: 'error',
    });
  try {
    const plans = await Plan.find(queryString(req)).populate(
      'services.service'
    );
    res.status(200).send({
      data: plans,
      message: 'Plans successfully fetched',
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
  const { error } = emptyPlanValidate(req.body);
  if (error)
    return res.status(400).send({
      message: error.details[0].message,
      status: 'error',
    });
  try {
    const plan = await Plan.findById(req.params.id);
    if (!plan)
      return res.status(404).send({
        message: "Plan doesn't exist",
        status: 'error',
      });
    res.status(200).send({
      data: plan,
      message: 'Plan successfully fetched',
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
  const { error } = updatePlanValidate(req.body);
  if (error)
    return res.status(400).send({
      message: error.details[0].message,
      status: 'error',
    });
  try {
    const plan = await Plan.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!plan) {
      return res.status(404).send({
        message: "Plan doesn't exist",
        status: 'error',
      });
    }
    res.status(200).send({
      data: plan,
      message: 'Plan successfully updated',
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
  const { error } = emptyPlanValidate(req.body);
  if (error)
    return res.status(400).send({
      message: error.details[0].message,
      status: 'error',
    });

  try {
    const plan = await Plan.findByIdAndDelete(req.params.id);
    if (!plan) {
      return res.status(404).send({
        message: "Plan doesn't exist",
        status: 'error',
      });
    }
    res.status(200).send({
      data: plan,
      message: 'Plan successfully deleted',
      status: 'success',
    });
  } catch (error) {
    res.status(error.status || 500).send({
      message: 'Something went wrong. please try again later',
      status: 'error',
    });
  }
};
