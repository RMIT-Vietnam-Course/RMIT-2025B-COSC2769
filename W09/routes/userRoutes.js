const express = require('express');
const userController = require('../controllers/userController');

const router = express.Router();

router.get('/', userController.home);
router.post(
    '/login',
    express.json(),
    express.urlencoded({ extended: false }),
    userController.authenticate
);

exports.userRoutes = router;