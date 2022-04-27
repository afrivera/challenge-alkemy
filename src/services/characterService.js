const CharacterRepository = require("../repositories/characterRepository");

const characterRepository = new CharacterRepository();

const findall = async ()=> {
    return await characterRepository.findAll();
}

const findById = async ( id )=> {
    return await characterRepository.findById( id );
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

module.exports = {
    findall,
    findById,
    findByName,
    save,
    update,
    remove
};
