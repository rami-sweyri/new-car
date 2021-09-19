const Car = require('../models/Car');
const { paginatedResults } = require('../utils/paginatedResults');
const { queryString } = require('../utils/queryString');
const {
  createCarValidate,
  updateCarValidate,
  emptyCarValidate,
} = require('../validation/car');

exports.create = async (req, res) => {
  const { error } = createCarValidate(req.body);
  if (error)
    return res.status(400).send({
      message: error.details[0].message,
      status: 'error',
    });

  const car = new Car({ ...req.body, createdBy: req.user._id });
  try {
    await car.save();
    res.status(201).send({
      data: car,
      message: 'Car successfully created',
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
  const { error } = emptyCarValidate(req.body);
  if (error)
    return res.status(400).send({
      message: error.details[0].message,
      status: 'error',
    });

  try {
    const cars = await Car.find(queryString(req))
      .populate('building')
      .populate('city');
    res.status(200).send({
      data: cars,
      message: 'Cars successfully fetched',
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
  const { error } = emptyCarValidate(req.body);
  if (error)
    return res.status(400).send({
      message: error.details[0].message,
      status: 'error',
    });

  try {
    const paginationQuery = await paginatedResults(req, Car);
    const cars = await Car.find(queryString(req))
      .populate('building')
      .populate('city')
      .limit(paginationQuery.pagination.limit)
      .skip(paginationQuery.startIndex)
      .sort({ createdAt: -1 })
      .exec();

    res.status(200).send({
      pagination: { ...paginationQuery.pagination, count: cars.length },
      data: cars,
      message: 'Cars successfully fetched',
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
  const { error } = emptyCarValidate(req.body);
  if (error)
    return res.status(400).send({
      message: error.details[0].message,
      status: 'error',
    });

  try {
    const cars = await Car.find().where('createdBy').in([req.user._id]);

    res.status(200).send({
      data: cars,
      message: 'Cars successfully fetched',
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
  const { error } = emptyCarValidate(req.body);
  if (error)
    return res.status(400).send({
      message: error.details[0].message,
      status: 'error',
    });

  try {
    const car = await Car.findById(req.params.id).populate('building');
    if (!car)
      return res.status(404).send({
        message: "Car doesn't exist",
        status: 'error',
      });

    res.status(200).send({
      data: car,
      message: 'Car successfully fetched',
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
  const { error } = updateCarValidate(req.body);
  if (error)
    return res.status(400).send({
      message: error.details[0].message,
      status: 'error',
    });

  try {
    const car = await Car.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    }).populate('building');
    if (!car)
      return res.status(404).send({
        message: "Car doesn't exist",
        status: 'error',
      });

    res.status(200).send({
      data: car,
      message: 'Car successfully updated',
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
  const { error } = emptyCarValidate(req.body);
  if (error)
    return res.status(400).send({
      message: error.details[0].message,
      status: 'error',
    });

  try {
    const car = await Car.findByIdAndDelete(req.params.id).populate('building');
    if (!car)
      return res.status(404).send({
        message: "Car doesn't exist",
        status: 'error',
      });

    res.status(200).send({
      data: car,
      message: 'Car successfully deleted',
      status: 'success',
    });
  } catch (error) {
    res.status(error.status || 500).send({
      message: 'Something went wrong. please try again later',
      status: 'error',
    });
  }
};
