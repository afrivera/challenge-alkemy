const dotenv = require('dotenv');

const envFound = dotenv.config();
// console.log(envFound);
 
if( envFound.error ){  
    throw new Error( "Couldn't find .env file");
}

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

module.exports = {
    port: process.env.PORT,
    api: { 
        prefix: '/api/v1'
    },
    log:{
        level: process.env.LOG_LEVEL
    },
    database: { 
        name: process.env.DB_NAME,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
    },
    jwt:{
        secret: process.env.JWT_SECRET,
        ttl: process.env.JWT_TTL
    },
    swagger:{
        path:'/documentation'
    },
    azure:{
        connectionstring: process.env.AZURE_STORAGE_CONNECTION_STRING, 
        container: process.env.AZURE_CONTAINER,
        storage: process.env.AZURE_STORAGE_ACCOUNT
    }
};


