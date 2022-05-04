const multer = require('multer');
const path = require('path');
const AppError = require('../errors/AppError');

// multer config
module.exports = multer({
    // storage: multer.diskStorage({}),
    fileFilter: (req, file, cb)=> {
        let ext = path.extname(file.originalname);
        if( ext !== '.jpg' && ext!=='.jpeg' && ext!=='.png'){
            cb( new AppError('File Type is not supported, only "jpg", "jpeg" "png"', 400), false );
            return;
        }
        cb( null, true );
    }
})
