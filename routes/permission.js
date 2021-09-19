const { Router } = require('express');
const checkPermissions = require('../middleware/checkPermissions');
const isAuthenticated = require('../middleware/isAuthenticated');
const permissionController = require('../controllers/permission');
const router = Router();

router.post(
  '/',
  isAuthenticated,
  checkPermissions(['createPermission']),
  permissionController.create
);
router.get(
  '/',
  isAuthenticated,
  checkPermissions(['findPermissions']),
  permissionController.find
);
router.get(
  '/all',
  isAuthenticated,
  checkPermissions(['findAllPermissions']),
  permissionController.findAll
);
router.get(
  '/:id',
  isAuthenticated,
  checkPermissions(['findOnePermission']),
  permissionController.findOne
);
router.patch(
  '/:id',
  isAuthenticated,
  checkPermissions(['updatePermission']),
  permissionController.update
);
router.delete(
  '/:id',
  isAuthenticated,
  checkPermissions(['deletePermission']),
  permissionController.delete
);

module.exports = router;
