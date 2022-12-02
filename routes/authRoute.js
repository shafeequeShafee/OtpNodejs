const router = require('express').Router();
const authController = require('../controller/authController');
router.post('/', authController.signUpUser);
router.post('/verify', authController.verifyEmail);
router.post('/cosmoDBStorage', authController.cosmoDBStorage);
router.post('/blobStorage', authController.blobStorage);

module.exports = router;
