const Gender = require('../models/gender');

class GenderRepository{
    constructor(){}

    async findById( id ){
        return await Gender.findByPk( id );
    }

    async findByName( name){
        return await Gender.findOne( { where: { name }});
    }
}

module.exports = GenderRepository;