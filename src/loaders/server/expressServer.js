const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const path = require('path');

const config = require('../../config');
const logger = require('../logger');



class ExpressServer {

    constructor(){
        this.app = express();
        this.port = config.port;
        this.pathRoutes = {
            users: `${config.api.prefix}/users`,
            auth: `${config.api.prefix}/auth`,
            characters: `${config.api.prefix}/characters`,
            movies: `${config.api.prefix}/movies`,
            images: `${config.api.prefix}/images`,
        }


        this._middlewares();
        this._swaggerConfig();
        this._routes();


        // bad request or route doesn't exist
        this._notFound();
        this._errorHandler();

    }

    _middlewares(){
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(morgan('tiny'));
    }

    _routes(){
        this.app.use(this.pathRoutes.users, require('../../routes/users'));
        this.app.use(this.pathRoutes.auth, require('../../routes/auth'));
        this.app.use(this.pathRoutes.characters, require('../../routes/characters'));
        this.app.use(this.pathRoutes.movies, require('../../routes/movies'));
        this.app.use(this.pathRoutes.images, require('../../routes/images'));
    }

    _notFound(){
        this.app.use((req, res, next)=>{
            const err = new Error('Not Found');
            err.status = 404;
            err.code = 404;
            next( err );
        });
    }

    _errorHandler(){
        this.app.use( (err, req, res, next) =>{

            const code = err.code || 500;

            logger.error(`${code} - ${ err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
            logger.error(err.stack);

            res.status( code );
            const body = {
                error: {
                    code,
                    message: err.message,
                    detail: err.data
                }
            }

            res.json(body);
        });
    }

    _swaggerConfig(){
        this.app.use(
            config.swagger.path,
            swaggerUi.serve,
            swaggerUi.setup(require('../swagger/swagger.json'))
        )
    }

    async start(){
        this.app.listen(this.port, (error) =>{
            if( error ){
                logger.error(error);
                process.exit(1);
                return
            }            
        } );
    }


}


module.exports = ExpressServer;