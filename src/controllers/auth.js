const { request, response} = require('express');

const authService = require('../services/authService');
const Success = require('../handlers/successHandler');

const login = async (req= request, res= response, next) => {

    try {
        const { email, password } = req.body;

        res.json( new Success( await authService.login( email, password )));
        
    } catch (error) {
        next( error );
    }

}

const register = async (req = request, res = response, next)=> {
    try {
        const { username, password, email } = req.body;

        const user = { username, password, email};

        res.status(201).json(new Success( await authService.register( user )))
        
    } catch (error) {
        next( error );
    }
}

module.exports = {
    login,
    register
};
