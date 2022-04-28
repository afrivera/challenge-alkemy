const { check } = require('express-validator');

const { validResult, valueRequired } = require('../common');

const _emailValid = check('email', 'Email is invalid').isEmail();

const postLoginRequestValidations = [
    valueRequired('email'),
    valueRequired('password'),
    _emailValid,
    validResult
];

const postRegisterRequestValidations = [
    valueRequired('email'),
    valueRequired('password'),
    valueRequired('username'),
    _emailValid,
    validResult

]

module.exports = {
    postLoginRequestValidations,
    postRegisterRequestValidations,
};
