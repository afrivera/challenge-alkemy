const Character = require('../models/character');


class CharacterRepository {
    
    constructor(){}

    async findAll(){
        return await Character.findAll();
    }

    async findById( id ){
        return await Character.findByPk( id );
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