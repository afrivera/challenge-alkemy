const { check }  =require('express-validator');
const { validJWT, validResult, valueRequired } = require('../common');

const upload = require('../../utils/multer');
const { COLLECTIONS } = require('../../constants');
const AppError = require('../../errors/AppError');

const hasCollection = collection => {
    return (req, res, next )=> {
        try {
            const { collection } = req.params;
            if( !COLLECTIONS.includes( collection )){
                return new AppError( 'Collection does not exist', 400);
            }
            next();
            
        } catch (error) {
            next( error );
        }
    }
}

const putRequestValidations = [
    // validJWT,
    valueRequired('id'),
    valueRequired('collection'),
    validResult,
    // hasCollection,
    upload.single('image')
]



module.exports = {
    putRequestValidations
};
