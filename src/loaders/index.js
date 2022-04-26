const ExpressServer = require("./server/expressServer");
const db = require('./database');
const logger = require('./logger');

const startServer = async()=> {
    try {

        await db.authenticate();
        db.sync({ force: false });
        logger.info('Database loaded and connected');


        const server = new ExpressServer(); 

        server.start();
    } catch (error) {
        logger.error(error);
    }
}

module.exports = startServer;