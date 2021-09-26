const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../../models/User");
const { loginValidate } = require("../../validation/auth");
require("dotenv").config();

module.exports.login = async (req, res) => {
  /*** Error Validation **/
  const { error } = loginValidate(req.body);
  if (error)
    return res.status(400).send({
      message: error.details[0].message,
      status: "error",
    });
  try {
    const user = await User.findOne({ email: req.body.email }).select(
      "+password"
    );

    if (!user)
      return res.status(404).send({
        message: "User doesn't exist",
        status: "error",
      });

    /*** Check status **/
    // if (user.status !== 'active')
    //   return res.status(400).send({
    //     message:
    //       'User is not verified please verify your account and try again',
    //     status: 'error',
    //   });

    /*** Valid Password  **/
    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!validPassword)
      return res.status(400).send({
        message: "Invalid password",
        status: "error",
      });

    /*** Build Token  **/
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "64d",
    });

    let filteredUser = user.toObject();
    delete filteredUser.password;
    delete filteredUser.confirmationCode;

    res
      .header("x-access-token", token)
      .status(200)
      .send({
        data: { ...filteredUser, "x-access-token": token },
        message: "You have successfully logged in",
        status: "success",
      });
  } catch (error) {
    console.log({ error });
    res.status(error.status || 500).send({
      message: "Something went wrong. please try again later",
      status: "error",
    });
  }
};
