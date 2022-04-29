const { check } = require('express-validator');

const genderService = require('../../services/genderService');
const { validResult, valueRequired, validJWT} = require('../common');
const AppError = require('../../errors/AppError');
const { titleMovieExist, movieExist } = require('../../helpers/db-validations');

// Validations
const _titleExist = check('title').custom( titleMovieExist )

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

const _movieExist = check('id').custom( movieExist )


const getAllRequestValidations = [
    validJWT
]

const getRequestValidations = [

]

const postRequestValidations = [
    valueRequired('title'),
    valueRequired('creationDate'),
    valueRequired('calification'),
    valueRequired('gender'),
    valueRequired('contentType'),
    _genderExist,
    _titleExist,
    validResult,
    validJWT
]

const putRequestValidations = [
    valueRequired('id'),
    _movieExist,
    validResult,
    validJWT
]

const deleteRequestValidations = [
    valueRequired('id'),
    _movieExist,
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
