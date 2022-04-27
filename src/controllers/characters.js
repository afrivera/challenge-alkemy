const { response, request } = require('express');

const characterService = require('../services/characterService');
const Success = require('../handlers/successHandler');

const getAllCharacters = async (req, res, next) =>{
    try {
        const characters = await characterService.findall();
        res.json( new Success( characters ) );
         
    } catch (error) {
        next( error );
    }
}

const createCharacter = async(req= request, res= response, next)=> {

    try {
        const { name, image = '', age, weight = '', history } = req.body;
        let character = { name, image, age, weight, history};

        character = await characterService.save( character );
        res.status(201).json( new Success( character ) );
        
    } catch (error) {
        next( error );
    }

}

const updateCharacter = async(req= request, res= response, next)=> {

    try {
        const { id } = req.params;
        const character  = req.body;

        await characterService.update(id, character)

        res.json( new Success( { message: `character with ${id} was update`} ) );
        
    } catch (error) {
        next( error );
    }

}

const deleteCharacter = async(req= request, res= response, next)=> {

    try {
        const { id } = req.params;
        await characterService.remove( id );

        res.json( new Success ( `character with ${id} was remove`) );
        
    } catch (error) {
        next( error );
    }

}


module.exports = {
    getAllCharacters,
    createCharacter,
    updateCharacter,
    deleteCharacter
};