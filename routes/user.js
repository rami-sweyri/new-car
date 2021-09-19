const { Router } = require('express');
const userController = require('../controllers/user');
const checkPermissions = require('../middleware/checkPermissions');
const isAuthenticated = require('../middleware/isAuthenticated');
const router = Router();

router.post(
  '/',
  isAuthenticated,
  checkPermissions(['createUser']),
  userController.create
);
router.get(
  '/',
  isAuthenticated,
  checkPermissions(['findUsers']),
  userController.find
);
router.get(
  '/all',
  isAuthenticated,
  checkPermissions(['findAllUsers']),
  userController.findAll
);

router.get(
  '/:id',
  isAuthenticated,
  checkPermissions(['findOneUser']),
  userController.findOne
);
router.patch(
  '/:id',
  isAuthenticated,
  checkPermissions(['updateUser']),
  userController.update
);
router.delete(
  '/:id',
  isAuthenticated,
  checkPermissions(['deleteUser']),
  userController.delete
);

module.exports = router;
