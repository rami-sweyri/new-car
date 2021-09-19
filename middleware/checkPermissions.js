const Permission = require('../models/Permission');

function checkPermissions(allowedPermissions) {
  return async (req, res, next) => {
    try {
      // let availablePermissions = [];
      // req.user.roles.map(role =>
      //   role.permissions.map(permission =>
      //     availablePermissions.push(permission)
      //   )
      // );

      // const permissions = await Permission.find({
      //   _id: {
      //     $in: [...availablePermissions, ...req.user.permissions],
      //   },
      // });

      // if (
      //   !permissions.some(permission =>
      //     allowedPermissions.includes(permission.name)
      //   )
      // ) {
      //   return res.status(403).send({
      //     error: 'Please make sure you has appropriate permissions',
      //   });
      // }

      next();
    } catch (error) {
      res.status(400).send({ error: 'Invalid Token' });
    }
  };
}

module.exports = checkPermissions;
