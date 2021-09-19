const { Router } = require('express');
const isAuthenticated = require('../middleware/isAuthenticated');
const checkPermissions = require('../middleware/checkPermissions');

const scheduledWashController = require('../controllers/scheduledWash');
const router = Router();

router.post(
  '/',
  isAuthenticated,
  checkPermissions(['createScheduledWash']),
  scheduledWashController.create
);
router.get(
  '/',
  isAuthenticated,
  checkPermissions(['findScheduledWashes']),
  scheduledWashController.find
);
router.get(
  '/all',
  isAuthenticated,
  checkPermissions(['findAllScheduledWashes']),
  scheduledWashController.findAll
);
router.get(
  '/:id',
  isAuthenticated,
  checkPermissions(['findOneScheduledWash']),
  scheduledWashController.findOne
);
router.patch(
  '/:id',
  isAuthenticated,
  checkPermissions(['updateScheduledWash']),
  scheduledWashController.update
);

router.delete(
  '/:id',
  isAuthenticated,
  checkPermissions(['deleteScheduledWash']),
  scheduledWashController.delete
);

module.exports = router;
