const  { check, validationResult } = require('express-validator');

const AppError = require('../errors/AppError');

const validResult = (req, res, next)=> {
    const errors = validationResult(req);
    if( !errors.isEmpty()){
        throw new AppError('Validations Errors', 400, errors.errors);
    }
    next();
}

const valueRequired = value => check(value, `${ value } is required`).not().isEmpty();


module.exports = {
    validResult,
    valueRequired
};
