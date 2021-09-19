const { Router } = require('express');
const authController = require('../controllers/auth');
const isAuthenticated = require('../middleware/isAuthenticated');

const router = Router();

router.post('/register', authController.register);
router.post('/login', authController.login);
router.get('/me', isAuthenticated, authController.me);
router.post('/verify', authController.verify);
router.post('/reverify', authController.reverify);
router.post('/forgot', authController.forgot);
router.post('/reset', authController.reset);
router.patch('/profile', isAuthenticated, authController.profile);

router.post('/register_phone', authController.registerPhone);
router.post('/login_phone', authController.loginPhone);

module.exports = router;
