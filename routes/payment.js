const { Router } = require('express');
const isAuthenticated = require('../middleware/isAuthenticated');
const paymentController = require('../controllers/payment');
const router = Router();

router.get('/authorised/:id/:code/', paymentController.authorised);
router.get('/declined/:id/', paymentController.declined);
router.get('/cancelled/:id/', paymentController.cancelled);
router.post('/unsubscribe/:id/', paymentController.unsubscribe);

module.exports = router;
