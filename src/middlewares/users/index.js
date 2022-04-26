const { check } = require('express-validator');

const { validResult, valueRequired} = require('../common');

// Validations



const getAllRequestValidations = [

]

const getRequestValidations = [

]

const postRequestValidations = [
    valueRequired('username'),
    valueRequired('password'),
    valueRequired('email'),
    validResult
]

const putRequestValidations = [
    valueRequired('id'),
    validResult

]

const deleteRequestValidations = [
    valueRequired('id'),
    validResult
]


module.exports = {
    getAllRequestValidations,
    getRequestValidations,
    postRequestValidations,
    putRequestValidations,
    deleteRequestValidations
};
