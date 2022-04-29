const { Op } = require('sequelize');
const Character = require('../models/character');
const Gender = require('../models/gender');
const Movie = require('../models/movie');


class CharacterRepository {
    
    constructor(){}

    async findAll( name, age, movies ){
        let where= {};
        if( name ){
            where.name = {
                [Op.like]: `%${name}%`
            }
        }
        if( age ){
            where.age = {
                [Op.eq]: age
            }
        }
        // if( movies ){
        //     where.movies = {
        //         [Op.like]: `%${movies}%`
        //     }
        // }

        return await Character.findAll({
            attributes:['image', 'name'],
            where
        });
    }

    async findById( id ){
        return await Character.findByPk( id );
    }

    async findByIdWithMovies( id ){
        return await Character.findByPk( id, {
            include: [
                {
                    model: Movie,
                    through: { attributes:[
                        'characterId'
                    ]},
                    include:[
                        {
                            model: Gender,
                            attributes: ['name']
                        }
                    ]
                }
            ]
        });
    }

    async findByName( name ){
        return await Character.findOne( {where: { name }});
    }

    async save( character ){
        return await Character.create( character );
    }

    async update( id, character ){
        const { password, ...saveCharacter} = character;
        return await Character.update( saveCharacter, { where: { id }} );
    }

    async remove( id ){
        return await Character.destroy( id );
    }
}

module.exports = CharacterRepository;