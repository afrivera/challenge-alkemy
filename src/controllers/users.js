const { response, request } = require('express');

const userService = require('../services/userService');

const getAllUsers = async (req, res, next) =>{
    try {
        const users = await userService.findall();
        res.json( users );
         
    } catch (error) {
        next( error );
    }
}

const createUser = async(req= request, res= response, next)=> {

    try {
        const { username, password, email } = req.body;
        let user = { username, password, email};

        user = await userService.save( user );
        res.status(201).json( user );
        
    } catch (error) {
        next( error );
    }

}

const updateUser = async(req= request, res= response, next)=> {

    try {
        const { id } = req.params;
        const { password, ...user } = req.body;

        const userUpdate = await userService.update( id, user );

        res.json( userUpdate );
        
    } catch (error) {
        next( error );
    }

}

const deleteUser = async(req= request, res= response, next)=> {

    try {
        const { id } = req.params;
        await userService.remove( id );

        res.json( { msg: `user with ${id} was remove`} );
        
    } catch (error) {
        next( error );
    }

}


module.exports = {
    getAllUsers,
    createUser,
    updateUser,
    deleteUser
};
