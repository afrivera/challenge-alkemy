const GenderRepository = require('../repositories/genderRepository');

const genderRepository = new GenderRepository();

const findById = async( id )=> {
    return await genderRepository.findById( id );
}

const findByName = async( name )=> {
    return await genderRepository.findByName( name );
}

module.exports = {
    findById,
    findByName
};
