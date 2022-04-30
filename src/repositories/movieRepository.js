const Movie = require('../models/movie');
const Gender = require('../models/gender');
const { Op } = require('sequelize');
const Character = require('../models/character');


class MovieRepository {
    
    constructor(){}

    async findAll( {title, genre, order = 'desc'} ){
        let where= {};
        if(title){
            where.title = {
                [Op.like]: `%${ title }%`
            }
        }
        if(genre){
            where.genderId = {
                [Op.eq]: genre
            }
        }
        return await Movie.findAndCountAll({
            where,
            attributes: ['image', 'title', 'creationDate'],
            order: [['creationDate', order]]
        });
    }

    async findById( id ){
        return await Movie.findByPk( id );
    }

    async findByIdWithCharacters(id){
        return await Movie.findByPk( id, {
            include: [
                {
                    model: Character,
                    through: { attributes:['movieId']},
                },
                {
                    model: Gender,
                    attributes:['name']
                }
            ],
            attributes: {exclude: ['genderId']}
            
        })
    }

    async findByTitle( title ){
        return await Movie.findOne( {where: { title }});
    }

    async save( movie ){

        return await Movie.create( movie, {
            include: Gender
        } );
    }

    async update( id, movie ){
        return await Movie.update( movie, { where: { id }} );
    }

    async remove( id ){
        return await Movie.destroy( id );
    }
}

module.exports = MovieRepository;