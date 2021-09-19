const User = require('../../models/User');
const { profileValidate } = require('../../validation/auth');

module.exports.profile = async (req, res) => {
  /*** Error Validation **/
  // const { error } = profileValidate(req.body);
  // if (error)
  //   return res.status(400).send({
  //     message: error.details[0].message,
  //     status: 'error',
  //   });
  try {
    const user = await User.findByIdAndUpdate(req.user._id, req.body, {
      new: true,
    }).select(['-confirmationCode']);

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
    if (error.code === 11000)
      return res.status(error.status || 500).send({
        message: 'This email or phone number below to another user',
        status: 'error',
      });
    res.status(error.status || 500).send({
      message: 'Something went wrong. please try again later',
      status: 'error',
    });
  }
};
