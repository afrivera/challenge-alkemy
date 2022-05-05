const startServer = async ()=>{
    require('./loaders')();
}

startServer();

module.exports = startServer;