const { Router } = require('express');
const checkPermissions = require('../middleware/checkPermissions');
const isAuthenticated = require('../middleware/isAuthenticated');
const cityController = require('../controllers/city');
const router = Router();

router.post(
  '/',
  isAuthenticated,
  checkPermissions(['createCity']),
  cityController.create
);
router.get(
  '/',
  isAuthenticated,
  checkPermissions(['findCities']),
  cityController.find
);
router.get(
  '/all',
  isAuthenticated,
  checkPermissions(['findAllCities']),
  cityController.findAll
);
router.get(
  '/:id',
  isAuthenticated,
  checkPermissions(['findOneCity']),
  cityController.findOne
);
router.patch(
  '/:id',
  isAuthenticated,
  checkPermissions(['updateCity']),
  cityController.update
);
router.delete(
  '/:id',
  isAuthenticated,
  checkPermissions(['deleteCity']),
  cityController.delete
);

module.exports = router;
