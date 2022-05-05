const User = require('../models/user');
const bcrypt = require('bcrypt');


class UserRepository {
    
    constructor(){}

    async findAll(){
        return await User.findAll();
    }

    async findById( id ){
        return await User.findByPk( id );
    }

    async findByEmail( email ){
        return await User.findOne( {where: { email }});
    }

    async findByName( username ){
        return await User.findOne( {where: { username }});
    }

    async save( user ){
        user.password = await bcrypt.hash( user.password, 10);
        return await User.create( user);
    }

    async update( id, user ){
        const { password, ...saveUser} = user;
        return await User.update( saveUser, { where: { id }} );
    }

    async remove( id ){
        return await User.destroy( id );
    }
}

module.exports = UserRepository;