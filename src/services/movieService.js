const MovieRepository = require("../repositories/movieRepository");

const movieRepository = new MovieRepository();

const findall = async ()=> {
    return await movieRepository.findAll();
}

const findById = async ( id )=> {
    return await movieRepository.findById( id );
}

const findByTitle = async ( title )=> {
    return await movieRepository.findByTitle( title );
}

const save = async ( movie )=> {
    return await movieRepository.save( movie );
}

const update = async ( id, movie )=> {
    return await movieRepository.update( id, movie );
}

const remove = async ( id )=> {
    return await movieRepository.remove( { where: { id }} );
}

module.exports = {
    findall,
    findById,
    findByTitle,
    save,
    update,
    remove
};
