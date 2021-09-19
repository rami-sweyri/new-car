const { Router } = require('express');
const checkPermissions = require('../middleware/checkPermissions');
const isAuthenticated = require('../middleware/isAuthenticated');
const roleController = require('../controllers/role');
const router = Router();

router.post(
  '/',
  isAuthenticated,
  checkPermissions(['createRole']),
  roleController.create
);
router.get(
  '/',
  isAuthenticated,
  checkPermissions(['findRoles']),
  roleController.find
);
router.get(
  '/all',
  isAuthenticated,
  checkPermissions(['findAllRoles']),
  roleController.findAll
);
router.get(
  '/:id',
  isAuthenticated,
  checkPermissions(['findOneRole']),
  roleController.findOne
);
router.patch(
  '/:id',
  isAuthenticated,
  checkPermissions(['updateRole']),
  roleController.update
);
router.delete(
  '/:id',
  isAuthenticated,
  checkPermissions(['deleteRole']),
  roleController.delete
);

module.exports = router;
