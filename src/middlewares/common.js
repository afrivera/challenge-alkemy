const  { check, validationResult } = require('express-validator');

const { validToken } = require('../services/authService');
const AppError = require('../errors/AppError');

const validResult = (req, res, next)=> {
    const errors = validationResult(req);
    if( !errors.isEmpty()){
        throw new AppError('Validations Errors', 400, errors.errors);
    }
    next();
}

const valueRequired = value => check(value, `${ value } is required`).not().isEmpty();

const validJWT = async(req, res, next )=> {
    try {
        const token = req.header('Authorization-Token');
        const user = await validToken( token );
        req.user = user;
        next();
        
    } catch (error) {
        next( error );
    }
}


module.exports = {
    validResult,
    valueRequired,
    validJWT
};
