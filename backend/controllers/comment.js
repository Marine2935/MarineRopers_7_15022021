const Comment = require('../models/Comment');


exports.getAllComments = (req, res, next) => {
    let postId = req.params.post_id;
    db.query(`SELECT * FROM comments WHERE comments.post_id = ${postId}`, (err, result) => {
        if (err) throw err;
        res.send(result);
    })
};

exports.createComment = (req, res, next) => {
    const commentObject = JSON.parse(req.body.comment);
    
    const comment = req.file ?
        new Comment({
            ...commentObject,
            post_id: req.params.post_id,
            fileUrl: `${req.protocol}://${req.get('host')}/files/${req.file.filename}`,            
        }) : new Comment({ 
            ...req.body,
            post_id: req.params.post_id 
            });

    db.query(`INSERT ${comment} INTO comments`, callback)                                                                                 //callback à paramétrer
};

exports.modifyComment = (req, res, next) => {
    let commentId = req.params.id;
    let request = ''

    if (req.file) {
        db.query(`SELECT file_name FROM comments WHERE comments.id = ${commentId}`, (err, result) => {
            if (err) throw err;
            return request = result;
        });

        if (request !== NULL) {
            const filename = request.split('/files/')[1];

            fs.unlink(`files/${filename}`, error => {
                if (error) throw error;
            });
        }
    };

    const commentObject = JSON.parse(req.body.comment);
    
    const comment = req.file ?
        new Comment({
            ...commentObject,
            post_id: req.params.post_id,
            fileUrl: `${req.protocol}://${req.get('host')}/files/${req.file.filename}`,            
        }) : new Comment({ 
            ...req.body,
            post_id: req.params.post_id 
            });

    db.query(`UPDATE * FROM comments WHERE comments.id = ${commentId}`, callback)                                                 //callback à paramétrer
};

exports.deleteComment = (req, res, next) => {
    let commentId = req.params.id;
    let request = ''

    if (req.file) {
        db.query(`SELECT file_name FROM comments WHERE comments.id = ${commentId}`, (err, result) => {
            if (err) throw err;
            return request = result;
        });

        if (request !== NULL) {
            const filename = request.split('/files/')[1];

            fs.unlink(`files/${filename}`, error => {
                if (error) throw error;
            });
        }
    };
    db.query(`DELETE * FROM comments WHERE comments.post_id = ${postId} AND comments.id = ${commentId}`, callback)            //callback à paramétrer
};

exports.reactComment = (req, res, next) => {

};