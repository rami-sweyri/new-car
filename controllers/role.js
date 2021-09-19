const Role = require('../models/Role');
const { paginatedResults } = require('../utils/paginatedResults');
const { queryString } = require('../utils/queryString');
const {
  createRoleValidate,
  emptyRoleValidate,
  updateRoleValidate,
} = require('../validation/role');

exports.create = async (req, res) => {
  const { error } = createRoleValidate(req.body);
  if (error)
    return res.status(400).send({
      error: error.details[0].message,
    });

  const roleExist = await Role.findOne({ name: req.body.name });
  if (roleExist)
    return res.status(400).send({
      error: 'Role already exists',
    });

  const role = new Role(req.body);
  try {
    await role.save();
    res.status(201).send({
      data: role,
      message: 'Role successfully created',
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
  const { error } = emptyRoleValidate(req.body);
  if (error)
    return res.status(400).send({
      message: error.details[0].message,
      status: 'error',
    });
  try {
    const roles = await Role.find(queryString(req));
    res.status(200).send({
      data: roles,
      message: 'Roles successfully fetched',
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
  const { error } = emptyRoleValidate(req.body);
  if (error)
    return res.status(400).send({
      message: error.details[0].message,
      status: 'error',
    });
  try {
    const paginationQuery = await paginatedResults(req, Role);
    const roles = await Role.find(queryString(req))
      .limit(paginationQuery.pagination.limit)
      .skip(paginationQuery.startIndex)
      .sort({ createdAt: -1 })
      .exec();

    res.status(200).send({
      pagination: { ...paginationQuery.pagination, count: roles.length },
      data: roles,
      message: 'Roles successfully fetched',
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
  const { error } = emptyRoleValidate(req.body);
  if (error)
    return res.status(400).send({
      message: error.details[0].message,
      status: 'error',
    });
  try {
    const role = await Role.findById(req.params.id);
    if (!role)
      return res.status(404).send({
        message: "Role doesn't exist",
        status: 'error',
      });
    res.status(200).send({
      data: role,
      message: 'Role successfully fetched',
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
  const { error } = updateRoleValidate(req.body);
  if (error)
    return res.status(400).send({
      message: error.details[0].message,
      status: 'error',
    });
  try {
    const role = await Role.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!role) {
      return res.status(404).send({
        message: "Role doesn't exist",
        status: 'error',
      });
    }
    res.status(200).send({
      data: role,
      message: 'Role successfully updated',
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
  const { error } = emptyRoleValidate(req.body);
  if (error)
    return res.status(400).send({
      message: error.details[0].message,
      status: 'error',
    });

  try {
    const role = await Role.findByIdAndDelete(req.params.id);
    if (!role) {
      return res.status(404).send({
        message: "Role doesn't exist",
        status: 'error',
      });
    }
    res.status(200).send({
      data: role,
      message: 'Role successfully deleted',
      status: 'success',
    });
  } catch (error) {
    res.status(error.status || 500).send({
      message: 'Something went wrong. please try again later',
      status: 'error',
    });
  }
};
