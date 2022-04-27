const Movie = require('../models/movie');


class MovieRepository {
    
    constructor(){}

    async findAll(){
        return await Movie.findAll();
    }

    async findById( id ){
        return await Movie.findByPk( id );
    }

    async findByTitle( title ){
        return await Movie.findOne( {where: { title }});
    }

    async save( movie ){
        return await Movie.create( movie );
    }

    async update( id, movie ){
        return await Movie.update( movie, { where: { id }} );
    }

    async remove( id ){
        return await Movie.destroy( id );
    }
}

module.exports = MovieRepository;