const { check } = require('express-validator');

const { validResult, valueRequired, validJWT} = require('../common');
const { nameCharacterExist, characterExist, movieExist } = require('../../helpers/db-validations');

// Validations
const _nameExist = check('name').custom( nameCharacterExist )

const _characterExist = check('id').custom( characterExist )
const _characterExistAss = check('idCharacter').custom( characterExist )
const _movieExist = check('idMovie').custom( movieExist);


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

const associateRequestValidation = [
    validJWT,
    valueRequired('idCharacter'),
    valueRequired('idMovie'),
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
