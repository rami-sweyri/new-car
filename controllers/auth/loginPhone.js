const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../../models/User');
const { loginPhoneValidate } = require('../../validation/auth');
require('dotenv').config();

module.exports.loginPhone = async (req, res) => {
  /*** Error Validation **/
  const { error } = loginPhoneValidate(req.body);
  if (error)
    return res.status(400).send({
      message: error.details[0].message,
      status: 'error',
    });
  try {
    const user = await User.findOne({ phone: req.body.phone });

    if (!user)
      return res.status(404).send({
        message: "User doesn't exist",
        status: 'error',
      });

    // if (user.confirmationCode.type !== 'check')
    //   return res.status(406).send({
    //     message: 'This code is not valid 404',
    //     status: 'error',
    //   });

    // if (
    //   new Date().toISOString() > user.confirmationCode.expiration.toISOString()
    // )
    //   return res.status(404).send({
    //     message: 'This code has expired. please request a new one.',
    //     status: 'error',
    //   });

    const validVerifyCode = await bcrypt.compare(
      req.body.code,
      user.confirmationCode.code
    );

    // if (!validVerifyCode)
    //   return res.status(406).send({
    //     message: 'Invalid code. please request a new one.',
    //     status: 'error',
    //   });

    /*** Build Token  **/
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '64d',
    });

    user.status = 'active';
    user.confirmationCode.expiration = Date.now();
    user.confirmationCode.type = 'expired';

    const updatedUser = await user.save();

    let filteredUser = updatedUser.toObject();
    delete filteredUser.password;
    delete filteredUser.confirmationCode;

    res
      .header('x-access-token', token)
      .status(200)
      .send({
        data: { ...filteredUser, 'x-access-token': token },
        message: 'You have successfully logged in',
        status: 'success',
      });
  } catch (error) {
    res.status(error.status || 500).send({
      message: 'Something went wrong. please try again later',
      status: 'error',
    });
  }
};
