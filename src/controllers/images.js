const { request, response } = require('express');
const imageService = require('../services/imageService');

const Success = require('../handlers/successHandler');


const uploadImage= async( req = request, res = response, next )=> {
    try {
        const { id, collection } = req.params;
        const { originalname, buffer} = req.file;
        const resp = await imageService.uploadImage( id, collection, originalname, buffer );
        res.json(new Success( { resp }));
        
    } catch (error) {
        next( error );
    }
}

module.exports = {
    uploadImage
};
