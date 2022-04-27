const { response, request } = require('express');

const movieService = require('../services/movieService');
const Success = require('../handlers/successHandler');

const getAllMovies = async (req, res, next) =>{
    try {
        const movies = await movieService.findall();
        res.json( new Success( movies ) );
         
    } catch (error) {
        next( error );
    }
}

const createMovie = async(req= request, res= response, next)=> {

    try {
        const { title, image, creationDate, calification  } = req.body;
        let movie = { title, image, creationDate, calification };

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


module.exports = {
    getAllMovies,
    createMovie,
    updateMovie,
    deleteMovie
};
