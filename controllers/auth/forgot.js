const bcrypt = require('bcryptjs');
const randomize = require('randomatic');
const User = require('../../models/User');
const { sendMsg } = require('../../utils/sendMsg');
const { forgotValidate } = require('../../validation/auth');

module.exports.forgot = async (req, res) => {
  const { error } = forgotValidate(req.body);
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
    const salt = await bcrypt.genSalt(10);
    const confirmationCode = randomize('0', 6);
    const hashedCode = await bcrypt.hash(confirmationCode, salt);

    user.confirmationCode.code = hashedCode;
    user.confirmationCode.expiration = Date.now() + 30 * 60 * 1000;
    user.confirmationCode.type = 'reset';
    const updatedUser = await user.save();

    return sendMsg({
      res,
      subject: 'reset password',
      text: `
        Please use the following code within the next 30 minutes to reset your password: 
        ${confirmationCode}
        `,
      html: `
        <div>
          <p>Please use the following code within the next 30 minutes to reset your password:</p>
          <br />
          <strong>${confirmationCode}</strong>
        </div>
        `,
      email: req.body.email,
      data: { email: updatedUser.email },
      successMsg:
        'Your has been successfully send reset code. please check your account',
      errorMsg:
        'There is a problem in sending the verification message, please resend reset code and try again',
      successStatusCode: 200,
    });
  } catch (error) {
    res.status(error.status || 500).send({
      message: 'Something went wrong. please try again later',
      status: 'error',
    });
  }
};
