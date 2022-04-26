const UserRepository = require("../repositories/userRepository");

const userRepository = new UserRepository();

const findall = async ()=> {
    return await userRepository.findAll();
}

const findById = async ( id )=> {
    return await userRepository.findById( id );
}

const findByEmail = async ( email )=> {
    return await userRepository.findByEmail( email );
}

const save = async ( user )=> {
    return await userRepository.save( user );
}

const update = async ( id, user )=> {
    return await userRepository.update( id, user );
}

const remove = async ( id )=> {
    return await userRepository.remove( { where: { id }} );
}

module.exports = {
    findall,
    findById,
    findByEmail,
    save,
    update,
    remove
};
