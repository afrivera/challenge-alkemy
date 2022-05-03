const { check } = require('express-validator');

const genderService = require('../../services/genderService');
const { validResult, valueRequired, validJWT} = require('../common');
const AppError = require('../../errors/AppError');
const { titleMovieExist, movieExist, characterExist } = require('../../helpers/db-validations');

// Validations
const _titleExist = check('title').trim().custom( titleMovieExist )

const _genderExist = check('gender').custom(
    async (gender='', { req })=> {
        if( gender.trim() === ''){
            return;
        }
        const genderFound = await genderService.findByName( gender );
        if( !genderFound ){
            throw new AppError(`gender doesn't exist`, 400);
        }
        req.body.genderId = genderFound.id;
    }
)

const _movieExist = check('id', 'must be a number').isNumeric().custom( movieExist );
const _movieExistAss = check('idMovie').custom( movieExist );
const _characterExist = check('idCharacter').custom( characterExist );
const _calificationValid = check('calification', 'calification value must be between 1 to 5').isFloat({min: 1, max: 5 });


const getAllRequestValidations = [
    validJWT
]

const getRequestValidations = [
    validJWT,
    valueRequired('id'),
    _movieExist,
    validResult
]

const postRequestValidations = [
    validJWT,
    valueRequired('title'),
    valueRequired('creationDate'),
    valueRequired('calification'),
    valueRequired('gender'),
    valueRequired('contentType'),
    _genderExist,
    _titleExist,
    _calificationValid,
    validResult,
]

const putRequestValidations = [
    validJWT,
    valueRequired('id'),
    _movieExist,
    validResult,
]

const deleteRequestValidations = [
    validJWT,
    valueRequired('id'),
    _movieExist,
    validResult,
]

const associateRequestValidation = [
    validJWT,
    valueRequired('idMovie'),
    valueRequired('idCharacter'),
    _movieExistAss,
    _characterExist,
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
