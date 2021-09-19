const Permission = require('../models/Permission');
const { queryString } = require('../utils/queryString');
const {
  createPermissionValidate,
  emptyPermissionValidate,
  updatePermissionValidate,
} = require('../validation/permission');

exports.create = async (req, res) => {
  const { error } = createPermissionValidate(req.body);
  if (error)
    return res.status(400).send({
      error: error.details[0].message,
    });

  const permissionExist = await Permission.findOne({ name: req.body.name });
  if (permissionExist)
    return res.status(400).send({
      error: 'Permission already exists',
    });

  const permission = new Permission(req.body);
  try {
    await permission.save();
    res.status(201).send({
      data: permission,
      message: 'Permission successfully created',
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
  const { error } = emptyPermissionValidate(req.body);
  if (error)
    return res.status(400).send({
      message: error.details[0].message,
      status: 'error',
    });
  try {
    const permissions = await Permission.find(queryString(req));
    res.status(200).send({
      data: permissions,
      message: 'Permissions successfully fetched',
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
  const { error } = emptyPermissionValidate(req.body);
  if (error)
    return res.status(400).send({
      message: error.details[0].message,
      status: 'error',
    });
  try {
    const paginationQuery = await paginatedResults(req, Permission);
    const permissions = await Permission.find(queryString(req))
      .limit(paginationQuery.pagination.limit)
      .skip(paginationQuery.startIndex)
      .sort({ createdAt: -1 })
      .exec();

    res.status(200).send({
      pagination: { ...paginationQuery.pagination, count: permissions.length },
      data: permissions,
      message: 'Permissions successfully fetched',
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
  const { error } = emptyPermissionValidate(req.body);
  if (error)
    return res.status(400).send({
      message: error.details[0].message,
      status: 'error',
    });
  try {
    const permission = await Permission.findById(req.params.id);
    if (!permission)
      return res.status(404).send({
        message: "Permission doesn't exist",
        status: 'error',
      });
    res.status(200).send({
      data: permission,
      message: 'Permission successfully fetched',
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
  const { error } = updatePermissionValidate(req.body);
  if (error)
    return res.status(400).send({
      message: error.details[0].message,
      status: 'error',
    });
  try {
    const permission = await Permission.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );
    if (!permission) {
      return res.status(404).send({
        message: "Permission doesn't exist",
        status: 'error',
      });
    }
    res.status(200).send({
      data: permission,
      message: 'Permission successfully updated',
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
  const { error } = emptyPermissionValidate(req.body);
  if (error)
    return res.status(400).send({
      message: error.details[0].message,
      status: 'error',
    });

  try {
    const permission = await Permission.findByIdAndDelete(req.params.id);
    if (!permission) {
      return res.status(404).send({
        message: "Permission doesn't exist",
        status: 'error',
      });
    }
    res.status(200).send({
      data: permission,
      message: 'Permission successfully deleted',
      status: 'success',
    });
  } catch (error) {
    res.status(error.status || 500).send({
      message: 'Something went wrong. please try again later',
      status: 'error',
    });
  }
};
