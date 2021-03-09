const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, 'files');
    },
    
    filename: (req, file, callback) => {
        const extension = file.originalname.split('.')[1];
        const fileName = file.originalname.split('.')[0];        
        const name = fileName.split(' ').join('_');

        callback(null, name + Date.now() + '.' + extension);
    }
});

module.exports = multer({storage: storage}).single('file');