const { Router } = require('express');
const checkPermissions = require('../middleware/checkPermissions');
const isAuthenticated = require('../middleware/isAuthenticated');
const buildingController = require('../controllers/building');
const router = Router();

router.post(
  '/',
  isAuthenticated,
  checkPermissions(['createBuilding']),
  buildingController.create
);
router.get(
  '/',
  isAuthenticated,
  checkPermissions(['findBuildings']),
  buildingController.find
);
router.get(
  '/all',
  isAuthenticated,
  checkPermissions(['findAllBuildings']),
  buildingController.findAll
);
router.get(
  '/:id',
  isAuthenticated,
  checkPermissions(['findOneBuilding']),
  buildingController.findOne
);
router.patch(
  '/:id',
  isAuthenticated,
  checkPermissions(['updateBuilding']),
  buildingController.update
);
router.delete(
  '/:id',
  isAuthenticated,
  checkPermissions(['deleteBuilding']),
  buildingController.delete
);

module.exports = router;
