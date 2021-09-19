const { Router } = require('express');
const checkPermissions = require('../middleware/checkPermissions');
const isAuthenticated = require('../middleware/isAuthenticated');
const introController = require('../controllers/intro');
const router = Router();

router.post(
  '/',
  isAuthenticated,
  checkPermissions(['createIntro']),
  introController.create
);
router.get('/', introController.find);
router.get('/all', introController.findAll);
router.get('/:id', introController.findOne);
router.patch(
  '/:id',
  isAuthenticated,
  checkPermissions(['updateIntro']),
  introController.update
);
router.delete(
  '/:id',
  isAuthenticated,
  checkPermissions(['deleteIntro']),
  introController.delete
);

module.exports = router;
