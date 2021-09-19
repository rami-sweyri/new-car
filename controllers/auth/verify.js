const bcrypt = require('bcryptjs');
const User = require('../../models/User');
const { verifyValidate } = require('../../validation/auth');

module.exports.verify = async (req, res) => {
  /*** Error Validation **/
  const { error } = verifyValidate(req.body);
  if (error)
    return res.status(400).send({
      message: error.details[0].message,
      status: 'error',
    });
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user)
      return res.status(404).send({
        message: "User doesn't exist",
        status: 'error',
      });

    if (user.status === 'active')
      return res
        .status(423)
        .send({ message: 'Your account already activated', status: 'warning' });

    if (user.confirmationCode.type !== 'verify')
      return res.status(406).send({
        message: 'This code is not for account verification',
        status: 'error',
      });

    if (
      new Date().toISOString() > user.confirmationCode.expiration.toISOString()
    )
      return res.status(404).send({
        message: 'This code has expired. please request a new one.',
        status: 'error',
      });

    const validVerifyCode = await bcrypt.compare(
      req.body.code,
      user.confirmationCode.code
    );
    if (!validVerifyCode)
      return res.status(406).send({
        message: 'Invalid code. please request a new one.',
        status: 'error',
      });

    user.status = 'active';
    user.confirmationCode.expiration = Date.now();
    user.confirmationCode.type = 'expired';

    const updatedUser = await user.save();

    res.status(200).send({
      data: { email: updatedUser.email },
      message: 'Your account has been verified successfully',
      status: 'success',
    });
  } catch (error) {
    res.status(error.status || 500).send({
      message: 'Something went wrong. please try again later',
      status: 'error',
    });
  }
};
