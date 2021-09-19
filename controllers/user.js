const bcrypt = require('bcryptjs');
const randomize = require('randomatic');

const User = require('../models/User');
const { paginatedResults } = require('../utils/paginatedResults');
const { queryString } = require('../utils/queryString');
const {
  createUserValidate,
  emptyUserValidate,
  updateUserValidate,
} = require('../validation/user');

exports.create = async (req, res) => {
  const { error } = createUserValidate(req.body);
  if (error) {
    if (
      error.details[0].message === 'passwordConfirmation must be [ref:password]'
    ) {
      return res.status(400).send({
        message: 'Password and password confirmation do not match',
        status: 'error',
      });
    }
    return res.status(400).send({
      message: error.details[0].message,
      status: 'error',
    });
  }

  try {
    const userExist = await User.findOne({ email: req.body.email });
    if (userExist)
      return res.status(400).send({
        error: 'User already exists',
      });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const confirmationCode = randomize('0', 6);
    const hashedCode = await bcrypt.hash(confirmationCode, salt);

    const user = new User({
      ...req.body,
      password: hashedPassword,
      status: 'active',
      confirmationCode: {
        code: hashedCode,
        expiration: Date.now(),
        type: 'expired',
      },
    });

    const newUser = await user.save();

    /*** Delete Hashed Password && Verify Code from return user **/
    let filteredUser = newUser.toObject();
    delete filteredUser.password;
    delete filteredUser.confirmationCode;

    res.status(201).send({
      data: filteredUser,
      message: 'User successfully created',
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
  const { error } = emptyUserValidate(req.body);
  if (error)
    return res.status(400).send({
      message: error.details[0].message,
      status: 'error',
    });
  console.log({
    query: req.query.query,
    typeof: typeof req.query.query,
  });

  try {
    const users = await User.find(queryString(req)).select('-confirmationCode');
    res.status(200).send({
      data: users,
      message: 'Users successfully fetched',
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
  const { error } = emptyUserValidate(req.body);
  if (error)
    return res.status(400).send({
      message: error.details[0].message,
      status: 'error',
    });

  try {
    const paginationQuery = await paginatedResults(req, User);
    const users = await User.find(queryString(req))
      .select('-confirmationCode')
      .limit(paginationQuery.pagination.limit)
      .skip(paginationQuery.startIndex)
      .sort({ createdAt: -1 })
      .exec();

    res.status(200).send({
      pagination: { ...paginationQuery.pagination, count: users.length },
      data: users,
      message: 'Users successfully fetched',
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
  const { error } = emptyUserValidate(req.body);
  if (error)
    return res.status(400).send({
      message: error.details[0].message,
      status: 'error',
    });

  try {
    const user = await User.findById(req.params.id).select('-confirmationCode');
    if (!user)
      return res.status(404).send({
        message: "User doesn't exist",
        status: 'error',
      });
    res.status(200).send({
      data: user,
      message: 'User successfully fetched',
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
  const { error } = updateUserValidate(req.body);
  if (error)
    return res.status(400).send({
      message: error.details[0].message,
      status: 'error',
    });

  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    }).select('-confirmationCode');
    if (!user)
      return res.status(404).send({
        message: "User doesn't exist",
        status: 'error',
      });
    res.status(200).send({
      data: user,
      message: 'User successfully updated',
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
  const { error } = emptyUserValidate(req.body);
  if (error)
    return res.status(400).send({
      message: error.details[0].message,
      status: 'error',
    });

  try {
    const user = await User.findByIdAndDelete(req.params.id).select([
      '-confirmationCode',
      '-password',
    ]);
    if (!user) {
      return res.status(404).send({
        message: "User doesn't exist",
        status: 'error',
      });
    }
    res.status(200).send({
      data: user,
      message: 'User successfully deleted',
      status: 'success',
    });
  } catch (error) {
    res.status(error.status || 500).send({
      message: 'Something went wrong. please try again later',
      status: 'error',
    });
  }
};
