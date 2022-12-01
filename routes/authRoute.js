const router = require('express').Router();
const authController = require('../controller/authController');
router.post('/', authController.signUpUser);
router.post('/verify', authController.verifyEmail);

module.exports = router;
