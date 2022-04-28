const ExpressServer = require("./server/expressServer");

const db = require('./database');
const logger = require('./logger');
const config = require('../config');

const startServer = async()=> {
    try {

        await db.authenticate();
        require('../models/user');
        require('../models/character');
        require('../models/movie');
        require('../models/gender');

        await db.sync({ alter: true });
        logger.info('Database loaded and connected');


        const server = new ExpressServer(); 

        server.start();
        logger.info(`
            #############################################
                Server listening on port: ${ config.port }
            #############################################`);
    } catch (error) {
        logger.error(error);
    }
}

module.exports = startServer;