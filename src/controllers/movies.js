const { response, request } = require('express');

const movieService = require('../services/movieService');
const Success = require('../handlers/successHandler');

const getAllMovies = async (req, res, next) =>{
    try {
        const { filter= ''} = req.query;

        const movies = await movieService.findall( filter );
        res.json( new Success( movies ) );
         
    } catch (error) {
        next( error );
    }
}

const getMovieById = async( req = request, res = response, next )=> {
    try {
        res.json( new Success( req.movie));
        
    } catch (error) {
        next( error );
    }
}

const getByIdWithCharacters = async (req, res, next) =>{
    try {
        const { id } = req.params;

        const movie = await movieService.findByIdWithCharacters( id );
        res.json( new Success( movie ) );
         
    } catch (error) {
        next( error );
    }
}

const createMovie = async(req= request, res= response, next)=> {

    try {
        const { title, image, creationDate, calification, genderId, contentType  } = req.body;
        let movie = { title, image, creationDate, calification, genderId, contentType };

        movie = await movieService.save( movie );
        res.status(201).json( new Success( movie ) );
        
    } catch (error) {
        next( error );
    }

}

const updateMovie = async(req= request, res= response, next)=> {

    try {
        const { id } = req.params;
        const movie  = req.body;

        await movieService.update(id, movie)

        res.json( new Success( { message: `movie with ${id} was update`} ) );
        
    } catch (error) {
        next( error );
    }

}

const deleteMovie = async(req= request, res= response, next)=> {

    try {
        const { id } = req.params;
        await movieService.remove( id );

        res.json( new Success ( {message: `movie with ${id} was remove`}) );
        
    } catch (error) {
        next( error );
    }

}

const associateCharacter = async( req = request, res = response, next)=>{
    try {
        const { movie, character } = req;
        await movieService.associate( movie, character );
        res.json(new Success({ message: 'movie associated with character'}))
    } catch (error) {
        next( error );
    }
}


module.exports = {
    getAllMovies,
    getMovieById,
    getByIdWithCharacters,
    createMovie,
    updateMovie,
    deleteMovie,
    associateCharacter
};
