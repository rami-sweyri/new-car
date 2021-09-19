const jwt = require('jsonwebtoken');
const User = require('../models/User');
require('dotenv').config();

module.exports = function (req, res, next) {
  const token = req.header('x-access-token');
  if (!token)
    return res.status(403).send({
      message: 'No token provided.',
      type: 'error',
    });

  try {
    jwt.verify(token, process.env.JWT_SECRET, async function (error, decoded) {
      if (error)
        return res
          .status(500)
          .send({ message: 'Failed to authenticate token.', type: 'error' });

      const user = await User.findById(decoded._id).populate('roles');
      if (!user)
        return res.status(404).send({
          message: 'Invalid Token. please check if user exists',
          type: 'error',
        });
      req.user = user;
      next();
    });
  } catch (error) {
    res.status(400).send({ message: 'Invalid Token', type: 'error' });
  }
};
