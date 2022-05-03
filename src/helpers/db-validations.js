const characterService = require('../services/characterService');
const movieService = require('../services/movieService');
const AppError = require('../errors/AppError');


const nameCharacterExist = async( name= '' )=> {

    const character = await characterService.findByName( name );
    if( character ){
        throw new AppError( `character already exist with id: ${character.id}`, 400 );
    }
}

const characterExist = async ( id = '', { req } )=> {
    if(!Number.isNaN(id)){
        throw new AppError(`id must be a number`);
    }
    const character = await characterService.findById( id );
    if( !character ){
        throw new AppError(`Character with id: ${id} doesn't exist`);
    }
    req.character = character;
}

const titleMovieExist= async( title= '')=>{
    const movie = await movieService.findByTitle( title );
    if( movie ){
        throw new AppError(`Movie already exist with id: ${movie.id}`, 400);
    }
}

const movieExist = async (id = '', { req })=> {
    if(!Number.isNaN(id)){
        throw new AppError(`id must be a number`);
    }
    const movie = await movieService.findById( id );
    if( !movie ){
        throw new AppError(`movie with id: ${id} doesn't exist`);
    }
    req.movie = movie;
}

module.exports = {
    characterExist,
    movieExist,
    nameCharacterExist,
    titleMovieExist,
};
