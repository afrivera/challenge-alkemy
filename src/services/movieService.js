const MovieRepository = require("../repositories/movieRepository");

const movieRepository = new MovieRepository();

const findall = async ( filter )=> {
    return await movieRepository.findAll( filter );
}

const findById = async ( id )=> {
    return await movieRepository.findById( id );
}

const findByIdWithCharacters = async( id )=> {
    return await movieRepository.findByIdWithCharacters( id );
}

const findByTitle = async ( title )=> {
    return await movieRepository.findByTitle( title );
}

const save = async ( movie )=> {
    // const gender = await genderService.findByName( movie.gender);
    // movie.genderId = gender.id;

    return await movieRepository.save( movie );
}

const update = async ( id, movie )=> {
    return await movieRepository.update( id, movie );
}

const remove = async ( id )=> {
    return await movieRepository.remove( { where: { id }} );
}

const associate = async( movie, character )=> {
    await movie.addCharacter( character );
}

// this function is to remove association with characters
const removeAssociate = async( movie, character )=> {
    await movie.removeCharacter( character );
}

module.exports = {
    findall,
    findById,
    findByIdWithCharacters,
    findByTitle,
    save,
    update,
    remove,
    associate,
    removeAssociate
};
