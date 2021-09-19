const City = require('../models/City');
const { paginatedResults } = require('../utils/paginatedResults');
const { queryString } = require('../utils/queryString');
const {
  createCityValidate,
  updateCityValidate,
  emptyCityValidate,
} = require('../validation/city');

exports.create = async (req, res) => {
  const { error } = createCityValidate(req.body);
  if (error)
    return res.status(400).send({
      message: error.details[0].message,
      status: 'error',
    });

  const city = new City(req.body).populate('building');
  try {
    await city.save();
    res.status(201).send({
      data: city,
      message: 'City successfully created',
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
  const { error } = emptyCityValidate(req.body);
  if (error)
    return res.status(400).send({
      message: error.details[0].message,
      status: 'error',
    });

  try {
    const cities = await City.find(queryString(req)).populate('building');
    res.status(200).send({
      data: cities,
      message: 'Cities successfully fetched',
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
  const { error } = emptyCityValidate(req.body);
  if (error)
    return res.status(400).send({
      message: error.details[0].message,
      status: 'error',
    });

  try {
    const paginationQuery = await paginatedResults(req, City);
    const cities = await City.find(queryString(req))
      .populate('building')
      .limit(paginationQuery.pagination.limit)
      .skip(paginationQuery.startIndex)
      .sort({ createdAt: -1 })
      .exec();

    res.status(200).send({
      pagination: { ...paginationQuery.pagination, count: cities.length },

      data: cities,
      message: 'Cities successfully fetched',
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
  const { error } = emptyCityValidate(req.body);
  if (error)
    return res.status(400).send({
      message: error.details[0].message,
      status: 'error',
    });

  try {
    const city = await City.findById(req.params.id).populate('building');
    if (!city)
      return res.status(404).send({
        message: "City doesn't exist",
        status: 'error',
      });

    res.status(200).send({
      data: city,
      message: 'City successfully fetched',
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
  const { error } = updateCityValidate(req.body);
  if (error)
    return res.status(400).send({
      message: error.details[0].message,
      status: 'error',
    });

  try {
    const city = await City.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    }).populate('building');
    if (!city)
      return res.status(404).send({
        message: "City doesn't exist",
        status: 'error',
      });

    res.status(200).send({
      data: city,
      message: 'City successfully updated',
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
  const { error } = emptyCityValidate(req.body);
  if (error)
    return res.status(400).send({
      message: error.details[0].message,
      status: 'error',
    });

  try {
    const city = await City.findByIdAndDelete(req.params.id).populate(
      'building'
    );
    if (!city)
      return res.status(404).send({
        message: "City doesn't exist",
        status: 'error',
      });

    res.status(200).send({
      data: city,
      message: 'City successfully deleted',
      status: 'success',
    });
  } catch (error) {
    res.status(error.status || 500).send({
      message: 'Something went wrong. please try again later',
      status: 'error',
    });
  }
};
