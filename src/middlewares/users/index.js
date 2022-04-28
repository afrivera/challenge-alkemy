const { check } = require('express-validator');

const userService = require('../../services/userService');
const { validResult, valueRequired} = require('../common');
const AppError = require('../../errors/AppError');

// Validations
const _emailExist = check('email').custom(
    async (email= '') => {
        const userFound = await userService.findByEmail( email );
        if( userFound ){
            throw new AppError('Email already exist in DB', 400, email);
        }
    }
)


const getAllRequestValidations = [

]

const getRequestValidations = [

]

const postRequestValidations = [
    valueRequired('username'),
    valueRequired('password'),
    valueRequired('email'),
    _emailExist,
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
