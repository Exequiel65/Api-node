const express = require('express');
const router = express.Router();
const auth = require('../controllers/auth.controller');
const AuthMiddleware = require('../middlewares/auth.middleware');
const Validator = require('../middlewares/validateFields');
const { login, register } = require('../validations/auth.validation')


router.post('/login', login, Validator.validateFields, auth.processLogin )
router.post('/register', register, Validator.validateFields, AuthMiddleware.searchEmailUser, auth.register )


module.exports = router