const User = require('../../models/User');

module.exports.me = async (req, res) => {
  try {
    const user = await User.findById(req.user._id)
      .select(['-confirmationCode'])
      .populate('building');
    if (!user)
      return res.status(404).send({
        message: "User doesn't exist",
        status: 'error',
      });

    // if (user.status !== 'active')
    //   return res.status(400).send({
    //     message:
    //       'User is not verified please verify your account and try again',
    //     status: 'error',
    //   });

    let filteredUser = user.toObject();
    delete filteredUser.password;
    delete filteredUser.confirmationCode;

    res.status(200).send({
      data: filteredUser,
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
