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

module.exports = {
    login
};
