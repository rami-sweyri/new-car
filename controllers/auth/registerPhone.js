const bcrypt = require("bcryptjs");
const axios = require("axios");
const randomize = require("randomatic");
const User = require("../../models/User");
const { registerPhoneValidate } = require("../../validation/auth");
require("dotenv").config();

module.exports.registerPhone = async (req, res) => {
  /*** Error Validation **/
  // const { error } = registerPhoneValidate(req.body);
  // if (error)
  //   return res.status(400).send({
  //     message: error.details[0].message,
  //     status: "error",
  //   });

  try {
    const userExist = await User.findOne({ phone: req.body.phone });

    const salt = await bcrypt.genSalt(10);

    const confirmationCode = randomize("0", 6);
    // const confirmationCode = '000000';
    const hashedCode = await bcrypt.hash(confirmationCode, salt);

    if (userExist) {
      userExist.confirmationCode.code = hashedCode;
      userExist.confirmationCode.expiration = Date.now() + 30 * 60 * 1000;
      userExist.confirmationCode.type = "check";

      const updatedUser = await userExist.save();

      let filteredUser = updatedUser.toObject();
      delete filteredUser.password;
      delete filteredUser.confirmationCode;
      let path =
        "https://globalsms.edsfze.com:1010/API//SendSMS?username=Edssample&apiId=fj3KO2Wc&json=True&destination=" +
        filteredUser.phone
          .trim()
          .replace("+", "")
          .replace("00971", "971")
          .replace("97105", "9715") +
        "&source=AD-OGLE&text=" +
        confirmationCode;

      axios
        .get(encodeURI(path))
        .then(result => {
          console.log({ result });
          if (result.data.ErrorCode !== 0) {
            return res.status(500).send({
              data: filteredUser,
              message: "something went wrong with we can't send msg right now",
              type: "error",
            });
          }
          return res.status(200).send({
            data: filteredUser,
            message: "You have successfully logged in",
            status: "success",
          });
        })
        .catch(err => {
          console.log({ err });
          return res.status(500).send({
            message: "something went wrong. please try again later",
            type: "error",
          });
        });
    } else {
      const user = new User({
        phone: req.body.phone,
        confirmationCode: {
          code: hashedCode,
          expiration: Date.now() + 30 * 60 * 1000,
          type: "check",
        },
      });

      const newUser = await user.save();
      let filteredUser = newUser.toObject();
      delete filteredUser.password;
      delete filteredUser.confirmationCode;
      delete filteredUser.confirmationCode;
      let path =
        "https://globalsms.edsfze.com:1010/API//SendSMS?username=Edssample&apiId=fj3KO2Wc&json=True&destination=" +
        filteredUser.phone
          .trim()
          .replace("+", "")
          .replace("00971", "971")
          .replace("97105", "9715") +
        "&source=AD-OGLE&text=" +
        confirmationCode;

      axios
        .get(encodeURI(path))
        .then(result => {
          console.log({ result });
          if (result.data.ErrorCode !== 0) {
            return res.status(500).send({
              data: filteredUser,
              message: "something went wrong with we can't send msg right now",
              type: "error",
            });
          }
          return res.status(200).send({
            data: filteredUser,
            message: "You have successfully logged in",
            status: "success",
          });
        })
        .catch(err => {
          console.log({ err });
          return res.status(500).send({
            message: "something went wrong. please try again later",
            type: "error",
          });
        });
    }
  } catch (error) {
    console.log({ error });
    res.status(error.status || 500).send({
      message: "Something went wrong. please try again later",
      status: "error",
    });
  }
};
