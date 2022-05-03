const { check } = require('express-validator');

const { validResult, valueRequired, validJWT} = require('../common');
const { nameCharacterExist, characterExist, movieExist } = require('../../helpers/db-validations');

// Validations
const _nameExist = check('name').custom( nameCharacterExist )

const _characterExist = check('id').isNumeric('must be a number').custom( characterExist )
const _characterExistAss = check('idCharacter').custom( characterExist )
const _movieExist = check('idMovie').custom( movieExist);
const _weightValid = check('weight', 'weight value must be a number').isFloat({ max: 200 });


const getAllRequestValidations = [
    validJWT
]

const getRequestValidations = [
    validJWT,
    valueRequired('id'),
    _characterExist,
    validResult
]

const postRequestValidations = [
    validJWT,
    valueRequired('name'),
    valueRequired('age'),
    valueRequired('history'),
    valueRequired('weight'),
    validResult,
    _weightValid,
    _nameExist,
    validResult,
]

const putRequestValidations = [
    validJWT,
    valueRequired('id'),
    _characterExist,
    validResult,
]

const deleteRequestValidations = [
    validJWT,
    valueRequired('id'),
    validResult,
    _characterExist,
    validResult,
]

const associateRequestValidation = [
    validJWT,
    valueRequired('idCharacter'),
    valueRequired('idMovie'),
    validResult,
    _characterExistAss,
    _movieExist,
    validResult
]

module.exports = {
    getAllRequestValidations,
    getRequestValidations,
    postRequestValidations,
    putRequestValidations,
    deleteRequestValidations,
    associateRequestValidation
};
