const { Router } = require('express');
const serviceController = require('../controllers/service');
const checkPermissions = require('../middleware/checkPermissions');
const isAuthenticated = require('../middleware/isAuthenticated');
const router = Router();

router.post(
  '/',
  isAuthenticated,
  checkPermissions(['createService']),
  serviceController.create
);

router.get(
  '/',
  isAuthenticated,
  checkPermissions(['findServices']),
  serviceController.find
);

router.get(
  '/all',
  isAuthenticated,
  checkPermissions(['findAllServices']),
  serviceController.findAll
);

router.get(
  '/:id',
  isAuthenticated,
  checkPermissions(['findOneService']),
  serviceController.findOne
);

router.patch(
  '/:id',
  isAuthenticated,
  checkPermissions(['updateService']),
  serviceController.update
);

router.delete(
  '/:id',
  isAuthenticated,
  checkPermissions(['deleteService']),
  serviceController.delete
);

module.exports = router;
