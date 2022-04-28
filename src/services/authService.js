const bcript = require('bcrypt');

const AppError = require('../errors/AppError');
const userService = require('./userService');
const { generateJWT, validateJWT } = require('../helpers/jwt-validations')

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
        const token = await generateJWT( user.id )

        return { 
            token,
            user: user.username,
            role: user.role
        }
        
    } catch (error) {
        throw error;
    }
}

const register = async( user )=> {
    try {
        // validate if email exist
        const userFound = await userService.findByEmail( user.email);
        if( userFound){
            throw new AppError('Email already exist', 401);
        }
        await userService.save( user );
        return 'User registered, you can log In to use API';
        
    } catch (error) {
        throw error;
    }

}

const validToken = async ( token )=> {
    
    try {
        // valid if there is a token
        if( !token ){
            throw new AppError('Authentication failed! Token required', 401)
        }
    
        // valid if token is valid
        const { data : id} = validateJWT( token );
        console.log(id);
        
        // validate if user with id exist
        const user = await userService.findById( id );

        if( !user ){
            throw new AppError('Authentication failed! user doesn\'t exist');
        }

        if( !user.enable){
            throw new AppError('Authentication failed! user disable', 401);
        }

        return user;

    } catch (error) {
        throw error;
    }




}




module.exports = {
    login,
    register,
    validToken
};
