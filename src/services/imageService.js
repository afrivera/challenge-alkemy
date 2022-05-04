const { v4:uuidv4} = require('uuid');

const AppError = require('../errors/AppError');
const ImageRepository = require('../repositories/imageRepository');
const CharacterRepository = require('../repositories/characterRepository');
const MovieRepository = require('../repositories/movieRepository');

const imageRepository = new ImageRepository();
const characterRepository = new CharacterRepository();
const movieRepository = new MovieRepository();

const uploadImage = async ( id, collection, originalname, buffer )=> {
    try {
        let modelo;

        switch( collection){
            case 'character':
                modelo = await characterRepository.findById( id );
                if( !modelo ){
                    throw new AppError(`The ${ id } does not exist`, 400);
                }
                break;
            
            case 'movie':
                modelo = await movieRepository.findById( id );
                if( !modelo ){
                    throw new AppError(`The ${ id } does not exist`, 400);
                }
                break;
            default:
                break
        }

        // delete image if exist
        if(modelo.image){
            const [,,,,key] = modelo.image.split('/');
            await imageRepository.deleteImage( key );
        }
        
        const nameId = uuidv4();
        const name = `${nameId}.${originalname.split('.')[1]}`;
        const respuesta = await imageRepository.uploadImage( name, buffer ); 
        modelo.image = respuesta;
        return await modelo.save();
        
        
    } catch (error) {
        throw error;
    }
}

module.exports = {
    uploadImage
};
