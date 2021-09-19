const bcrypt = require('bcryptjs');
const User = require('../../models/User');
const { resetValidate } = require('../../validation/auth');

module.exports.reset = async (req, res) => {
  /*** Error Validation **/
  const { error } = resetValidate(req.body);
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

    if (user.confirmationCode.type !== 'reset')
      return res.status(406).send({
        message: 'This code is not for reset password',
        status: 'error',
      });

    if (
      new Date().toISOString() > user.confirmationCode.expiration.toISOString()
    )
      return res.status(404).send({
        message: 'This code has expired. please request a new one.',
        status: 'error',
      });

    const validResetCode = await bcrypt.compare(
      req.body.code,
      user.confirmationCode.code
    );
    if (!validResetCode)
      return res.status(406).send({
        message: 'Invalid code. please request a new one.',
        status: 'error',
      });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    user.password = hashedPassword;
    user.confirmationCode.expiration = Date.now();
    user.confirmationCode.type = 'expired';

    const updatedUser = await user.save();

    res.status(200).send({
      data: { email: updatedUser.email },
      message: 'Your password has been reset successfully',
      status: 'success',
    });
  } catch (error) {
    res.status(error.status || 500).send({
      message: 'Something went wrong. please try again later',
      status: 'error',
    });
  }
};
