const bcript = require('bcrypt');
const jwt = require('jsonwebtoken');

const config = require('../config');
const AppError = require('../errors/AppError');
const userService = require('./userService');

const login = async ( email, password )=> {
    try {
        // validate email in db
        const user = await userService.findByEmail( email );
        if( !user ){
            throw new AppError( 'Authentication failed! email or password is incorrect', 401);
        }

        // validate if user is enable
        if( !user.enable ){
            throw new AppError('Authentication failed! user does not exist', 401);
        }

        // validate password
        const isPasswordValid = await bcript.compare( password, user.password );
        if( !isPasswordValid ){
            throw new AppError('Authentication failed! email or password is incorrect', 401 )
        }

        // generate jwToken
        const token = await _token( user.id )

        return { 
            token,
            user: user.username,
            role: user.role
        }
        
    } catch (error) {
        throw error;
    }
}


const _token = id => {
    return new Promise((resolve, reject)=> {
        jwt.sign({ id }, config.jwt.secret, {
            expiresIn: config.jwt.ttl
        }, (err, token)=> {
            if( err ){
                reject( 'couldn\'t generate jwt');
            }else {
                resolve( token );
            }
        })
    })
}


module.exports = {
    login
};
