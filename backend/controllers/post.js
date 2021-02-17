const Post = require('../models/Post');
const fs = require('fs');


exports.getAllPosts= (req, res, next) => {
    db.query('SELECT * FROM posts', (err, result) => {
        if (err) throw err;
        res.send(result);
    })
};

exports.getOnePost = (req, res, next) => {
    let postId = req.params.post_id;
    db.query(`SELECT * FROM posts WHERE posts.id = ${postId}`, (err, result) => {
        if (err) throw err;
        res.send(result);
    })
};

exports.createPost = (req, res, next) => {
    const postObject = JSON.parse(req.body.post);
    
    const post = req.file ?
        new Post({
            ...postObject,
            fileUrl: `${req.protocol}://${req.get('host')}/files/${req.file.filename}`
        }) : new Post({ ...req.body });
    
    db.query(`INSERT ${post} INTO posts`, callback)                                                  //callback à paramétrer
};

exports.modifyPost = (req, res, next) => {
    let postId = req.params.post_id;
    let request = '';

    if (req.file) {
        db.query(`SELECT file_name FROM posts WHERE posts.id = ${postId}`, (err, result) => {
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

    const postObject = JSON.parse(req.body.post);
    
    const post = req.file ?
        new Post({
            ...postObject,
            fileUrl: `${req.protocol}://${req.get('host')}/files/${req.file.filename}`
        }) : new Post({ ...req.body });

    db.query(`UPDATE ${post} FROM posts WHERE posts.id = ${postId}`, callback);                        //callback à paramétrer
};

exports.deletePost = (req, res, next) => {
    let postId = req.params.post_id;
    let request = '';

    db.query(`SELECT file_name FROM posts WHERE posts.id = ${postId}`, (err, result) => {
        if (err) throw err;
        return request = result;
    });

    if (request !== NULL) {
        const filename = request.split('/files/')[1];

        fs.unlink(`files/${filename}`, error => {
            if (error) throw error;
        });
    };    

    db.query(`DELETE * FROM posts WHERE posts.id = ${postId}`, callback);                                //callback à paramétrer
};

exports.reactPost= (req, res, next) => {
    let postId = req.params.post_id;

};