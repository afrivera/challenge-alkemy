const ExpressServer = require("./server/expressServer");

const startServer = async()=> {
    try {
        const server = new ExpressServer();

        server.start();
    } catch (error) {
        console.log(error);
    }
}

module.exports = startServer;