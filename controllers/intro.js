const Intro = require('../models/Intro');
const { paginatedResults } = require('../utils/paginatedResults');
const { queryString } = require('../utils/queryString');
const {
  createIntroValidate,
  emptyIntroValidate,
  updateIntroValidate,
} = require('../validation/intro');

exports.create = async (req, res) => {
  const { error } = createIntroValidate(req.body);
  if (error)
    return res.status(400).send({
      error: error.details[0].message,
    });

  const introExist = await Intro.findOne({ name: req.body.name });
  if (introExist)
    return res.status(400).send({
      error: 'Intro already exists',
    });

  const intro = new Intro(req.body);
  try {
    await intro.save();
    res.status(201).send({
      data: intro,
      message: 'Intro successfully created',
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
  const { error } = emptyIntroValidate(req.body);
  if (error)
    return res.status(400).send({
      message: error.details[0].message,
      status: 'error',
    });
  try {
    const intros = await Intro.find(queryString(req));
    res.status(200).send({
      data: intros,
      message: 'Intros successfully fetched',
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
  const { error } = emptyIntroValidate(req.body);
  if (error)
    return res.status(400).send({
      message: error.details[0].message,
      status: 'error',
    });
  try {
    const paginationQuery = await paginatedResults(req, Intro);
    const intros = await Intro.find(queryString(req))
      .limit(paginationQuery.pagination.limit)
      .skip(paginationQuery.startIndex)
      .sort({ createdAt: -1 })
      .exec();

    res.status(200).send({
      pagination: { ...paginationQuery.pagination, count: intros.length },
      data: intros,
      message: 'Intros successfully fetched',
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
  const { error } = emptyIntroValidate(req.body);
  if (error)
    return res.status(400).send({
      message: error.details[0].message,
      status: 'error',
    });
  try {
    const intro = await Intro.findById(req.params.id);
    if (!intro)
      return res.status(404).send({
        message: "Intro doesn't exist",
        status: 'error',
      });
    res.status(200).send({
      data: intro,
      message: 'Intro successfully fetched',
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
  const { error } = updateIntroValidate(req.body);
  if (error)
    return res.status(400).send({
      message: error.details[0].message,
      status: 'error',
    });
  try {
    const intro = await Intro.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!intro) {
      return res.status(404).send({
        message: "Intro doesn't exist",
        status: 'error',
      });
    }
    res.status(200).send({
      data: intro,
      message: 'Intro successfully updated',
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
  const { error } = emptyIntroValidate(req.body);
  if (error)
    return res.status(400).send({
      message: error.details[0].message,
      status: 'error',
    });

  try {
    const intro = await Intro.findByIdAndDelete(req.params.id);
    if (!intro) {
      return res.status(404).send({
        message: "Intro doesn't exist",
        status: 'error',
      });
    }
    res.status(200).send({
      data: intro,
      message: 'Intro successfully deleted',
      status: 'success',
    });
  } catch (error) {
    res.status(error.status || 500).send({
      message: 'Something went wrong. please try again later',
      status: 'error',
    });
  }
};
