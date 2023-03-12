const { check } = require('express-validator')

const login = [
    check('email')
    .notEmpty()
    .withMessage('Email is required').bail()
    .isEmail()
    .withMessage('Wrong email').bail(),

    check('password')
    .isString()
    .withMessage('Password invalid').bail()
    .notEmpty()
    .withMessage('Password is required').bail()
    .isLength({min : 8, max : 12})
    .withMessage('min 8 and max 12 characters').bail()


]

const register = [
    check('name')
    .notEmpty()
    .withMessage('Name is required').bail()
    .isString()
    .withMessage('Name invalid').bail()
    .isLength({ max : 20})
    .withMessage('max 20 characters').bail()
    ,
    check('email')
    .notEmpty()
    .withMessage('Email is required').bail()
    .isEmail()
    .withMessage('Wrong email').bail(),

    check('password')
    .isString()
    .withMessage('Password invalid').bail()
    .notEmpty()
    .withMessage('Password is required').bail()
    .isLength({min : 8, max : 12})
    .withMessage('min 8 and max 12 characters').bail()
]

module.exports = {
    login,
    register
}