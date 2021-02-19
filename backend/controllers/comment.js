const { models } = require('../models');


exports.getAllComments = (req, res, next) => {
    models.Comment.findAll({ where: { post_id: req.params.post_id } })
    .then(comments => res.status(200).json(comments))
    .catch(error => res.status(400).json({ error }));
};

exports.createComment = (req, res, next) => {    
    const comment = { 
        ...req.body,
        post_id: req.params.post_id 
    };

    models.Comment.create(comment)
    .then(() => res.status(201).json({ message: 'Nouveau commentaire créé !'}))
    .catch(error => res.status(400).json({ error }));
};

// exports.modifyComment = (req, res, next) => {
//     const comment = { 
//         ...req.body,
//         post_id: req.params.post_id 
//     };

//     models.Comment.update(comment, { where: { id: req.params.id } })
//     .then(() => res.status(200).json({ message: 'Commentaire modifié !'}))
//     .catch(error => res.status(400).json({ error }));
// };

exports.deleteComment = (req, res, next) => {
    models.Comment.destroy({ where: { id: req.params.id } })
    .then(() => res.status(200).json({ message: 'Message supprimé !' }))
    .catch(error => res.status(500).json({ error }));
};

exports.reactComment = (req, res, next) => {

};