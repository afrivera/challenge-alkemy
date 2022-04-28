const { check } = require('express-validator');

const characterService = require('../../services/characterService');
const { validResult, valueRequired, validJWT} = require('../common');
const AppError = require('../../errors/AppError');

// Validations
const _nameExist = check('name').custom(
    async (name= '') => {
        const characterFound = await characterService.findByName( name );
        if( characterFound ){
            throw new AppError(`character already exist with id: ${characterFound.id}`, 400);
        }
    }
)

const _characterExist = check('id').custom(
    async( id = '', { req })=> {
        const characterFound = await characterService.findById( id );

        if( !characterFound ){
            throw new AppError(`Character with id: ${id} doesn't exist`);
        }
        req.character = characterFound;
    }
)


const getAllRequestValidations = [
    validJWT
]

const getRequestValidations = [
    validJWT
]

const postRequestValidations = [
    valueRequired('name'),
    valueRequired('age'),
    valueRequired('history'),
    _nameExist,
    validResult,
    validJWT
]

const putRequestValidations = [
    valueRequired('id'),
    _characterExist,
    validResult,
    validJWT
]

const deleteRequestValidations = [
    valueRequired('id'),
    _characterExist,
    validResult,
    validJWT
]


module.exports = {
    getAllRequestValidations,
    getRequestValidations,
    postRequestValidations,
    putRequestValidations,
    deleteRequestValidations
};
