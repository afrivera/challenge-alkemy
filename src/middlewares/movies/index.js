const { check } = require('express-validator');

const movieService = require('../../services/movieService');
const { validResult, valueRequired} = require('../common');
const AppError = require('../../errors/AppError');

// Validations
const _titleExist = check('title').custom(
    async (title= '') => {
        const movieFound = await movieService.findByTitle( title );
        if( movieFound ){
            throw new AppError(`Movie already exist with id: ${movieFound.id}`, 400);
        }
    }
)

const _movieExist = check('id').custom(
    async( id = '', { req })=> {
        const movieFound = await movieService.findById( id );

        if( !movieFound ){
            throw new AppError(`movie with id: ${id} doesn't exist`);
        }
        req.movie = movieFound;
    }
)


const getAllRequestValidations = [

]

const getRequestValidations = [

]

const postRequestValidations = [
    valueRequired('title'),
    valueRequired('creationDate'),
    valueRequired('calification'),
    _titleExist,
    validResult
]

const putRequestValidations = [
    valueRequired('id'),
    _movieExist,
    validResult

]

const deleteRequestValidations = [
    valueRequired('id'),
    _movieExist,
    validResult
]


module.exports = {
    getAllRequestValidations,
    getRequestValidations,
    postRequestValidations,
    putRequestValidations,
    deleteRequestValidations
};
