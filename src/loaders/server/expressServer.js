const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const path = require('path');

const config = require('../../config');



class ExpressServer {

    constructor(){
        this.app = express();
        this.port = config.port;



    }


    async start(){
        this.app.listen(this.port, (error) =>{
            if( error ){
                console.log(error);
                process.exit(1);
                return
            }

            console.log(`Server listening on port: ${this.port}`);
        } );
    }


}


module.exports = ExpressServer;