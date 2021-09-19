const { Router } = require('express');
const checkPermissions = require('../middleware/checkPermissions');
const isAuthenticated = require('../middleware/isAuthenticated');
const notificationController = require('../controllers/notification');
const router = Router();

router.post(
  '/',
  isAuthenticated,
  checkPermissions(['createNotification']),
  notificationController.create
);
router.get(
  '/',
  isAuthenticated,
  checkPermissions(['findNotifications']),
  notificationController.find
);
router.get(
  '/all',
  isAuthenticated,
  checkPermissions(['findAllNotifications']),
  notificationController.findAll
);
router.get(
  '/me',
  isAuthenticated,
  checkPermissions(['findMeNotifications']),
  isAuthenticated,
  notificationController.findMe
);

router.delete(
  '/me',
  isAuthenticated,
  checkPermissions(['findMeNotifications']),
  isAuthenticated,
  notificationController.deleteMe
);

router.get(
  '/:id',
  isAuthenticated,
  checkPermissions(['findOneNotification']),
  notificationController.findOne
);
router.patch(
  '/:id',
  isAuthenticated,
  checkPermissions(['updateNotification']),
  notificationController.update
);
router.delete(
  '/:id',
  isAuthenticated,
  checkPermissions(['deleteNotification']),
  notificationController.delete
);

module.exports = router;
