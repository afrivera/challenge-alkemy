const CharacterRepository = require("../repositories/characterRepository");

const characterRepository = new CharacterRepository();

const findall = async ( name, age, movies )=> {
    return await characterRepository.findAll( name, age, movies );
}

const findById = async ( id )=> {
    return await characterRepository.findById( id );
}

const findByIdWithMovies = async ( id )=> {
    return await characterRepository.findByIdWithMovies( id );
}

const findByName = async ( name )=> {
    return await characterRepository.findByName( name );
}

const save = async ( character )=> {
    return await characterRepository.save( character );
}

const update = async ( id, character )=> {
    return await characterRepository.update( id, character );
}

const remove = async ( id )=> {
    return await characterRepository.remove( { where: { id }} );
}

const associate = async (character, movie)=> {
    await character.addMovie( movie );
}

module.exports = {
    findall,
    findById,
    findByIdWithMovies,
    findByName,
    save,
    update,
    remove,
    associate
};
