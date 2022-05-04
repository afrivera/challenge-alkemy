const { BlobServiceClient } = require('@azure/storage-blob');
const config = require('../config');

class ImageRepository {

    constructor(){
        this.blobServiceClient = BlobServiceClient.fromConnectionString( config.azure.connectionstring );
        this.containerClient = this.blobServiceClient.getContainerClient(config.azure.container);
    }

    async uploadImage( name, buffer ){
        try {
            const imageBlobClient = this.containerClient.getBlockBlobClient( name );
            await imageBlobClient.upload(buffer, buffer.length);
            return `https://${config.azure.storage}.blob.core.windows.net/${config.azure.container}/${name}`;
            
        } catch (error) {
            throw error;
        } 
        
    }

    async deleteImage ( key = ''){
        try {
            const response = await this.containerClient.getBlockBlobClient(key).deleteIfExists();
            return response;
            
        } catch (error) {
            throw error;
        }
    }

}

module.exports = ImageRepository;