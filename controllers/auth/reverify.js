const bcrypt = require('bcryptjs');
const randomize = require('randomatic');
const User = require('../../models/User');
const { sendMsg } = require('../../utils/sendMsg');
const { reverifyValidate } = require('../../validation/auth');

module.exports.reverify = async (req, res) => {
  /*** Error Validation **/
  const { error } = reverifyValidate(req.body);
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

    const salt = await bcrypt.genSalt(10);
    const confirmationCode = randomize('0', 6);
    const hashedCode = await bcrypt.hash(confirmationCode, salt);

    user.confirmationCode.code = hashedCode;
    user.confirmationCode.expiration = Date.now() + 30 * 60 * 1000;
    user.confirmationCode.type = 'verify';
    const updatedUser = await user.save();

    return sendMsg({
      res,
      subject: 'Verify your account',
      text: `
          Please use the following code within the next 30 minutes to verify your account on YOUR APP: 
          ${confirmationCode}
          `,
      html: `
          <div>
            <p>Please use the following code within the next 30 minutes to verify your account on YOUR APP:</p>
            <br />
            <strong>${confirmationCode}</strong>
          </div>
          `,
      email: req.body.email,
      data: { email: updatedUser.email },
      successMsg:
        'Your has been successfully send verify code. please check your account',
      errorMsg:
        'There is a problem in sending the verification message, please resend verify code and try again',
      successStatusCode: 200,
    });
  } catch (error) {
    res.status(error.status || 500).send({
      message: 'Something went wrong. please try again later',
      status: 'error',
    });
  }
};
