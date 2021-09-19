const Building = require('../models/Building');
const { paginatedResults } = require('../utils/paginatedResults');
const { queryString } = require('../utils/queryString');
const {
  createBuildingValidate,
  updateBuildingValidate,
  emptyBuildingValidate,
} = require('../validation/building');

exports.create = async (req, res) => {
  const { error } = createBuildingValidate(req.body);
  if (error)
    return res.status(400).send({
      message: error.details[0].message,
      status: 'error',
    });

  const building = new Building(req.body);
  try {
    await building.save();
    res.status(201).send({
      data: building,
      message: 'Building successfully created',
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
  const { error } = emptyBuildingValidate(req.body);
  if (error)
    return res.status(400).send({
      message: error.details[0].message,
      status: 'error',
    });

  try {
    const buildings = await Building.find(queryString(req));
    res.status(200).send({
      data: buildings,
      message: 'Buildings successfully fetched',
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
  const { error } = emptyBuildingValidate(req.body);
  if (error)
    return res.status(400).send({
      message: error.details[0].message,
      status: 'error',
    });

  try {
    const paginationQuery = await paginatedResults(req, Building);
    const buildings = await Building.find(queryString(req))
      .limit(paginationQuery.pagination.limit)
      .skip(paginationQuery.startIndex)
      .sort({ createdAt: -1 })
      .exec();

    res.status(200).send({
      pagination: { ...paginationQuery.pagination, count: buildings.length },

      data: buildings,
      message: 'Buildings successfully fetched',
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
  const { error } = emptyBuildingValidate(req.body);
  if (error)
    return res.status(400).send({
      message: error.details[0].message,
      status: 'error',
    });

  try {
    const building = await Building.findById(req.params.id);
    if (!building)
      return res.status(404).send({
        message: "Building doesn't exist",
        status: 'error',
      });

    res.status(200).send({
      data: building,
      message: 'Building successfully fetched',
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
  const { error } = updateBuildingValidate(req.body);
  if (error)
    return res.status(400).send({
      message: error.details[0].message,
      status: 'error',
    });

  try {
    const building = await Building.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!building)
      return res.status(404).send({
        message: "Building doesn't exist",
        status: 'error',
      });

    res.status(200).send({
      data: building,
      message: 'Building successfully updated',
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
  const { error } = emptyBuildingValidate(req.body);
  if (error)
    return res.status(400).send({
      message: error.details[0].message,
      status: 'error',
    });

  try {
    const building = await Building.findByIdAndDelete(req.params.id);
    if (!building)
      return res.status(404).send({
        message: "Building doesn't exist",
        status: 'error',
      });

    res.status(200).send({
      data: building,
      message: 'Building successfully deleted',
      status: 'success',
    });
  } catch (error) {
    res.status(error.status || 500).send({
      message: 'Something went wrong. please try again later',
      status: 'error',
    });
  }
};
