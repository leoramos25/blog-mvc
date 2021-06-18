const multer = require('multer');
const jimp = require('jimp');
const uuid = require('uuid');

const multerOptions = {
    storage:multer.memoryStorage(),
    fileFilter:(req, res, next) => {
        const allowed = ['image/jpeg', 'image/jpg', 'image/png'];
        if(allowed.includes(file.mimetype)) {
            next(null, true);
        } else {
            next({message:'File not supported'}, false);
        };
    },
};

exports.upload = multer(multer).single('photo');

exports.resize = () => {
    
};