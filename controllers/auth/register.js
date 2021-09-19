const bcrypt = require('bcryptjs');
const randomize = require('randomatic');
const User = require('../../models/User');
const { sendMsg } = require('../../utils/sendMsg');
const { registerValidate } = require('../../validation/auth');

module.exports.register = async (req, res) => {
  /*** Error Validation **/
  const { error } = registerValidate(req.body);
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
    /*** User Exist **/
    const userExist = await User.findOne({ email: req.body.email });
    if (userExist)
      return res.status(400).send({
        message: 'User already exists',
        status: 'error',
      });

    /*** Hashed Password && Verify Code **/
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const confirmationCode = randomize('0', 6);
    const hashedCode = await bcrypt.hash(confirmationCode, salt);

    const user = new User({
      email: req.body.email,
      password: hashedPassword,
      confirmationCode: {
        code: hashedCode,
        expiration: Date.now() + 30 * 60 * 1000,
        type: 'verify',
      },
    });

    const newUser = await user.save();

    /*** Delete Hashed Password && Verify Code from return user **/
    let filteredUser = newUser.toObject();
    delete filteredUser.password;
    delete filteredUser.confirmationCode;

    /*** Send Email Verify Code  **/
    return sendMsg({
      res,
      subject: 'verify your account',
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
      data: filteredUser,
      successMsg:
        'Your user account has been successfully created. please verify your account',
      errorMsg:
        'User may have been created. but there is a problem in sending the verification message, please resend verify code and try again',
      successStatusCode: 201,
    });
  } catch (error) {
    console.log({ error });
    res.status(error.status || 500).send({
      message: 'Something went wrong. please try again later',
      status: 'error',
    });
  }
};
