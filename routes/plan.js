const { Router } = require('express');
const checkPermissions = require('../middleware/checkPermissions');
const isAuthenticated = require('../middleware/isAuthenticated');
const planController = require('../controllers/plan');
const router = Router();

router.post(
  '/',
  isAuthenticated,
  checkPermissions(['createPlan']),
  planController.create
);
router.get(
  '/',
  isAuthenticated,
  checkPermissions(['findPlans']),
  planController.find
);
router.get(
  '/all',
  isAuthenticated,
  checkPermissions(['findAllPlans']),
  planController.findAll
);
router.get(
  '/:id',
  isAuthenticated,
  checkPermissions(['findOnePlan']),
  planController.findOne
);
router.patch(
  '/:id',
  isAuthenticated,
  checkPermissions(['updatePlan']),
  planController.update
);
router.delete(
  '/:id',
  isAuthenticated,
  checkPermissions(['deletePlan']),
  planController.delete
);

module.exports = router;
