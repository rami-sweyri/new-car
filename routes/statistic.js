const { Router } = require('express');
const statisticController = require('../controllers/statistic');
const checkPermissions = require('../middleware/checkPermissions');
const isAuthenticated = require('../middleware/isAuthenticated');
const router = Router();

router.get(
  '/all',
  isAuthenticated,
  checkPermissions(['findAllStatistics']),
  statisticController.findAll
);

module.exports = router;
