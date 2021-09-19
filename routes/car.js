const { Router } = require('express');
const checkPermissions = require('../middleware/checkPermissions');
const isAuthenticated = require('../middleware/isAuthenticated');
const carController = require('../controllers/car');
const router = Router();

router.post(
  '/',
  isAuthenticated,
  checkPermissions(['createCar']),
  carController.create
);
router.get(
  '/',
  isAuthenticated,
  checkPermissions(['findCars']),
  carController.find
);
router.get(
  '/all',
  isAuthenticated,
  checkPermissions(['findAllCars']),
  carController.findAll
);
router.get(
  '/me',
  isAuthenticated,
  checkPermissions(['findMeCars']),
  isAuthenticated,
  carController.findMe
);
router.get(
  '/:id',
  isAuthenticated,
  checkPermissions(['findOneCar']),
  carController.findOne
);
router.patch(
  '/:id',
  isAuthenticated,
  checkPermissions(['updateCar']),
  carController.update
);
router.delete(
  '/:id',
  isAuthenticated,
  checkPermissions(['deleteCar']),
  carController.delete
);

module.exports = router;
