const sgMail = require('@sendgrid/mail');
require('dotenv').config();

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const msg = ({ email, subject, text, html }) => {
  return {
    to: email,
    from: 'rami.sweyri@gmail.com',
    subject,
    text,
    html,
  };
};
module.exports.sendMsg = async ({
  subject,
  text,
  html,
  res,
  email,
  data,
  successMsg,
  errorMsg,
  successStatusCode,
}) => {
  try {
    const result = await sgMail.send(msg({ email, subject, text, html }));
    if (result[0].statusCode !== 202)
      return res.status(400).send({
        message: errorMsg,
        status: 'warning',
      });
    res.status(successStatusCode).send({
      data: data,
      message: successMsg,
      status: 'success',
    });
  } catch (error) {
    res.status(error.status || 500).send({
      message: 'something went wrong. please try again later',
      status: 'error',
    });
  }
};
