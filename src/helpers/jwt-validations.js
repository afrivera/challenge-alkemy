const jwt = require('jsonwebtoken');

const config = require('../config');
const AppError = require('../errors/AppError');


const generateJWT = (data) => {
    return new Promise((resolve, reject)=> {
        jwt.sign({ data }, config.jwt.secret, {
            expiresIn: config.jwt.ttl
        },(err, token )=> {
            if( err ){
                reject( err.message );
            }else{
                resolve( token );
            }
        })
    })
}

const validateJWT = token=> {
    try {
        return jwt.verify( token, config.jwt.secret);
        
    } catch (error) {
        throw new AppError(error.message, 400);
    }

}

module.exports = {
    generateJWT,
    validateJWT
};
