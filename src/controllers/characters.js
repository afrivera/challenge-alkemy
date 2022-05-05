const { response, request } = require('express');

const characterService = require('../services/characterService');
const Success = require('../handlers/successHandler');

const getAllCharacters = async (req= request, res=response, next) =>{
    try {
        const { name = '', age = '', movies = '' } = req.query;
        const characters = await characterService.findall( name, age, movies );
        res.json( new Success( characters ) );
         
    } catch (error) {
        next( error );
    }
}

const getCharacterById = async ( req = request, res = response, next )=> {
    try {
        // const { id } = req.query;
        // const character = await characterService.findById( id );
        res.json( new Success( req.character ) );

    } catch (error) {
        next( error );
    }
}

const getByIdWithMovies = async (req= request, res=response, next) =>{
    try {
        const { id } = req.params;
        const characters = await characterService.findByIdWithMovies( id );
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

        res.json( new Success ( {message: `character with ${id} was remove`}) );
        
    } catch (error) {
        next( error );
    }

}

const associateMovie = async( req= request, res = response, next) => {
    try {
        const { movie, character } = req;

        await characterService.associate( character, movie );
        res.json( new Success( {message: 'character associated with movie'}));
        
    } catch (error) {
        next( error );
    }
}

module.exports = {
    getAllCharacters,
    getCharacterById,
    getByIdWithMovies,
    createCharacter,
    updateCharacter,
    deleteCharacter,
    associateMovie
};
