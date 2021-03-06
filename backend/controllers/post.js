const { models } = require('../models');
const sequelize = require('../models/index');
const sanitizeHtml = require('sanitize-html');
const fs = require('fs');

models.posts.belongsTo(models.users, { foreignKey: 'user_id' });
models.posts.hasMany(models.comments, { foreignKey: 'post_id' });
models.posts.hasMany(models.comment_answers, { foreignKey: 'post_id' });
models.post_reactions.belongsTo(models.posts, { foreignKey: 'post_id' });
models.post_reactions.belongsTo(models.users, { foreignKey: 'user_id' });

exports.getAllPosts= (req, res, next) => {
    models.posts.findAll({ 
        include: [{ model: models.users, required: true }, { model: models.comments }], 
        attributes: { 
            include: [ 
                [ sequelize.fn('TIMESTAMPDIFF', sequelize.literal('SECOND'), sequelize.col('date_post'), sequelize.literal('CURRENT_TIMESTAMP')), 'date_post_sec' ],
                [ sequelize.fn('TIMESTAMPDIFF', sequelize.literal('MINUTE'), sequelize.col('date_post'), sequelize.literal('CURRENT_TIMESTAMP')), 'date_post_min' ],
                [ sequelize.fn('TIMESTAMPDIFF', sequelize.literal('HOUR'), sequelize.col('date_post'), sequelize.literal('CURRENT_TIMESTAMP')), 'date_post_hour' ],
                [ sequelize.fn('TIMESTAMPDIFF', sequelize.literal('DAY'), sequelize.col('date_post'), sequelize.literal('CURRENT_TIMESTAMP')), 'date_post_day' ],
                [ sequelize.fn('TIMESTAMPDIFF', sequelize.literal('MONTH'), sequelize.col('date_post'), sequelize.literal('CURRENT_TIMESTAMP')), 'date_post_month' ],
                [ sequelize.fn('TIMESTAMPDIFF', sequelize.literal('YEAR'), sequelize.col('date_post'), sequelize.literal('CURRENT_TIMESTAMP')), 'date_post_year' ],
                
                [ sequelize.fn('TIMESTAMPDIFF', sequelize.literal('SECOND'), sequelize.col('last_update'), sequelize.literal('CURRENT_TIMESTAMP')), 'last_update_sec' ],
                [ sequelize.fn('TIMESTAMPDIFF', sequelize.literal('MINUTE'), sequelize.col('last_update'), sequelize.literal('CURRENT_TIMESTAMP')), 'last_update_min' ],
                [ sequelize.fn('TIMESTAMPDIFF', sequelize.literal('HOUR'), sequelize.col('last_update'), sequelize.literal('CURRENT_TIMESTAMP')), 'last_update_hour' ],
                [ sequelize.fn('TIMESTAMPDIFF', sequelize.literal('DAY'), sequelize.col('last_update'), sequelize.literal('CURRENT_TIMESTAMP')), 'last_update_day' ],
                [ sequelize.fn('TIMESTAMPDIFF', sequelize.literal('MONTH'), sequelize.col('last_update'), sequelize.literal('CURRENT_TIMESTAMP')), 'last_update_month' ],
                [ sequelize.fn('TIMESTAMPDIFF', sequelize.literal('YEAR'), sequelize.col('last_update'), sequelize.literal('CURRENT_TIMESTAMP')), 'last_update_year' ]
            ]
        },
        order: sequelize.literal('date_post DESC'),
    })
    .then(posts => res.status(200).json(posts))
    .catch(error => res.status(400).json({ error }));
};

exports.getOnePost = (req, res, next) => {
    models.posts.findByPk(req.params.post_id, { 
        include: [{ model: models.users, required: true }, { model: models.comments }],
        attributes: { 
            include: [
                [ sequelize.fn('TIMESTAMPDIFF', sequelize.literal('SECOND'), sequelize.col('date_post'), sequelize.literal('CURRENT_TIMESTAMP')), 'date_post_sec' ],
                [ sequelize.fn('TIMESTAMPDIFF', sequelize.literal('MINUTE'), sequelize.col('date_post'), sequelize.literal('CURRENT_TIMESTAMP')), 'date_post_min' ],
                [ sequelize.fn('TIMESTAMPDIFF', sequelize.literal('HOUR'), sequelize.col('date_post'), sequelize.literal('CURRENT_TIMESTAMP')), 'date_post_hour' ],
                [ sequelize.fn('TIMESTAMPDIFF', sequelize.literal('DAY'), sequelize.col('date_post'), sequelize.literal('CURRENT_TIMESTAMP')), 'date_post_day' ],
                [ sequelize.fn('TIMESTAMPDIFF', sequelize.literal('MONTH'), sequelize.col('date_post'), sequelize.literal('CURRENT_TIMESTAMP')), 'date_post_month' ],
                [ sequelize.fn('TIMESTAMPDIFF', sequelize.literal('YEAR'), sequelize.col('date_post'), sequelize.literal('CURRENT_TIMESTAMP')), 'date_post_year' ],
                
                [ sequelize.fn('TIMESTAMPDIFF', sequelize.literal('SECOND'), sequelize.col('last_update'), sequelize.literal('CURRENT_TIMESTAMP')), 'last_update_sec' ],
                [ sequelize.fn('TIMESTAMPDIFF', sequelize.literal('MINUTE'), sequelize.col('last_update'), sequelize.literal('CURRENT_TIMESTAMP')), 'last_update_min' ],
                [ sequelize.fn('TIMESTAMPDIFF', sequelize.literal('HOUR'), sequelize.col('last_update'), sequelize.literal('CURRENT_TIMESTAMP')), 'last_update_hour' ],
                [ sequelize.fn('TIMESTAMPDIFF', sequelize.literal('DAY'), sequelize.col('last_update'), sequelize.literal('CURRENT_TIMESTAMP')), 'last_update_day' ],
                [ sequelize.fn('TIMESTAMPDIFF', sequelize.literal('MONTH'), sequelize.col('last_update'), sequelize.literal('CURRENT_TIMESTAMP')), 'last_update_month' ],
                [ sequelize.fn('TIMESTAMPDIFF', sequelize.literal('YEAR'), sequelize.col('last_update'), sequelize.literal('CURRENT_TIMESTAMP')), 'last_update_year' ]
            ]
        }
    })
    .then(post => res.status(200).json(post))
    .catch(error => res.status(404).json({ error }));
};

exports.createPost = (req, res, next) => {    
    const post = req.file ?                                                                       
        ({
            ...JSON.parse(req.body.post),
            file_url: `${req.protocol}://${req.get('host')}/files/${req.file.filename}`,
            user_id: JSON.parse(req.body.post).user.id
        }) : ({ 
            ...req.body,
            user_id: req.body.user.id 
        }); 

    for (let i in post) {   
        if (post[i] !== null) {
            post[i] = sanitizeHtml(post[i]);  
        }                     
    };

    models.posts.create(post)
    .then(post => {
        models.posts.findByPk(post.id, { 
            include: [{ model: models.users, required: true }, { model: models.comments }],
            attributes: { 
                include: [
                    [ sequelize.fn('TIMESTAMPDIFF', sequelize.literal('SECOND'), sequelize.col('date_post'), sequelize.literal('CURRENT_TIMESTAMP')), 'date_post_sec' ],
                    [ sequelize.fn('TIMESTAMPDIFF', sequelize.literal('MINUTE'), sequelize.col('date_post'), sequelize.literal('CURRENT_TIMESTAMP')), 'date_post_min' ],
                    [ sequelize.fn('TIMESTAMPDIFF', sequelize.literal('HOUR'), sequelize.col('date_post'), sequelize.literal('CURRENT_TIMESTAMP')), 'date_post_hour' ],
                    [ sequelize.fn('TIMESTAMPDIFF', sequelize.literal('DAY'), sequelize.col('date_post'), sequelize.literal('CURRENT_TIMESTAMP')), 'date_post_day' ],
                    [ sequelize.fn('TIMESTAMPDIFF', sequelize.literal('MONTH'), sequelize.col('date_post'), sequelize.literal('CURRENT_TIMESTAMP')), 'date_post_month' ],
                    [ sequelize.fn('TIMESTAMPDIFF', sequelize.literal('YEAR'), sequelize.col('date_post'), sequelize.literal('CURRENT_TIMESTAMP')), 'date_post_year' ],
                    
                    [ sequelize.fn('TIMESTAMPDIFF', sequelize.literal('SECOND'), sequelize.col('last_update'), sequelize.literal('CURRENT_TIMESTAMP')), 'last_update_sec' ],
                    [ sequelize.fn('TIMESTAMPDIFF', sequelize.literal('MINUTE'), sequelize.col('last_update'), sequelize.literal('CURRENT_TIMESTAMP')), 'last_update_min' ],
                    [ sequelize.fn('TIMESTAMPDIFF', sequelize.literal('HOUR'), sequelize.col('last_update'), sequelize.literal('CURRENT_TIMESTAMP')), 'last_update_hour' ],
                    [ sequelize.fn('TIMESTAMPDIFF', sequelize.literal('DAY'), sequelize.col('last_update'), sequelize.literal('CURRENT_TIMESTAMP')), 'last_update_day' ],
                    [ sequelize.fn('TIMESTAMPDIFF', sequelize.literal('MONTH'), sequelize.col('last_update'), sequelize.literal('CURRENT_TIMESTAMP')), 'last_update_month' ],
                    [ sequelize.fn('TIMESTAMPDIFF', sequelize.literal('YEAR'), sequelize.col('last_update'), sequelize.literal('CURRENT_TIMESTAMP')), 'last_update_year' ]
                ]
            }
        })
        .then(post => res.status(200).json(post))
        .catch(error => res.status(404).json({ error }));
    }) 
    .catch(error => res.status(400).json({ error }));
};

exports.modifyPost = (req, res, next) => {
    models.posts.findByPk(req.params.post_id)
    .then(post => {
        const postObject = req.file ? ({...JSON.parse(req.body.post)}) : ({...req.body})

        // Vérification que l'utilisateur qui veut modifier le post est bien son auteur ou un modérateur.
        if (postObject.user.id === post.user_id || postObject.user.isAdmin) {
            // Si modification du fichier, suppression du fichier initialement stocké dans le dossier files puis mise à jour du post.
            if (req.file || !postObject.file_url) {        
                models.posts.findByPk(req.params.post_id)
                .then(post => {
                    if (post.file_url) {
                        const filename = post.file_url.split('/files/')[1];

                        fs.unlink(`files/${filename}`, error => {
                            if (error) throw error;
                        });
                    };
                })
                .catch(error => res.status(404). json({ error }));
            };
            
            const post = req.file ?                                                                       
                ({
                    ...JSON.parse(req.body.post),
                    file_url: `${req.protocol}://${req.get('host')}/files/${req.file.filename}`
                }) : ({ ...req.body });

            for (let i in post) {   
                if (post[i] !== null) {
                  post[i] = sanitizeHtml(post[i]);
                }                     
            };

            models.posts.update(post, { where: { id: req.params.post_id } })
            .then(() => {
                models.posts.findByPk(req.params.post_id, { 
                    include: [{ model: models.users, required: true }, { model: models.comments }],
                    attributes: { 
                        include: [
                            [ sequelize.fn('TIMESTAMPDIFF', sequelize.literal('SECOND'), sequelize.col('date_post'), sequelize.literal('CURRENT_TIMESTAMP')), 'date_post_sec' ],
                            [ sequelize.fn('TIMESTAMPDIFF', sequelize.literal('MINUTE'), sequelize.col('date_post'), sequelize.literal('CURRENT_TIMESTAMP')), 'date_post_min' ],
                            [ sequelize.fn('TIMESTAMPDIFF', sequelize.literal('HOUR'), sequelize.col('date_post'), sequelize.literal('CURRENT_TIMESTAMP')), 'date_post_hour' ],
                            [ sequelize.fn('TIMESTAMPDIFF', sequelize.literal('DAY'), sequelize.col('date_post'), sequelize.literal('CURRENT_TIMESTAMP')), 'date_post_day' ],
                            [ sequelize.fn('TIMESTAMPDIFF', sequelize.literal('MONTH'), sequelize.col('date_post'), sequelize.literal('CURRENT_TIMESTAMP')), 'date_post_month' ],
                            [ sequelize.fn('TIMESTAMPDIFF', sequelize.literal('YEAR'), sequelize.col('date_post'), sequelize.literal('CURRENT_TIMESTAMP')), 'date_post_year' ],
                            
                            [ sequelize.fn('TIMESTAMPDIFF', sequelize.literal('SECOND'), sequelize.col('last_update'), sequelize.literal('CURRENT_TIMESTAMP')), 'last_update_sec' ],
                            [ sequelize.fn('TIMESTAMPDIFF', sequelize.literal('MINUTE'), sequelize.col('last_update'), sequelize.literal('CURRENT_TIMESTAMP')), 'last_update_min' ],
                            [ sequelize.fn('TIMESTAMPDIFF', sequelize.literal('HOUR'), sequelize.col('last_update'), sequelize.literal('CURRENT_TIMESTAMP')), 'last_update_hour' ],
                            [ sequelize.fn('TIMESTAMPDIFF', sequelize.literal('DAY'), sequelize.col('last_update'), sequelize.literal('CURRENT_TIMESTAMP')), 'last_update_day' ],
                            [ sequelize.fn('TIMESTAMPDIFF', sequelize.literal('MONTH'), sequelize.col('last_update'), sequelize.literal('CURRENT_TIMESTAMP')), 'last_update_month' ],
                            [ sequelize.fn('TIMESTAMPDIFF', sequelize.literal('YEAR'), sequelize.col('last_update'), sequelize.literal('CURRENT_TIMESTAMP')), 'last_update_year' ]
                        ]
                    }
                })
                .then(post => res.status(200).json(post))
                .catch(error => res.status(404).json({ error }))
            })
            .catch(error => res.status(400).json({ error }));
        }
    })
    .catch(error => res.status(404).json({ error }));
};

exports.deletePost = (req, res, next) => {
     models.posts.findByPk(req.params.post_id)
    .then(post => {
        // Vérification que l'utilisateur qui veut supprimer le post est bien son auteur ou un modérateur.
        if (req.params.user_id === post.user_id || req.params.is_admin) {
           // Suppression du fichier stocké dans le dossier files puis suppression du post.
            models.posts.findByPk(req.params.post_id)
            .then(post => {
                if (post.file_url) {
                    const filename = post.file_url.split('/files/')[1];

                    fs.unlink(`files/${filename}`, error => {
                        if (error) throw error;
                    });
                };

                models.posts.destroy({ where: { id: req.params.post_id } })
                .then(() => res.status(200).json({ message: 'Post supprimé !'}))
                .catch(error => res.status(500).json({ error }));
            })
            .catch(error => res.status(404). json({ error }));   
        }
    })
    .catch(error => res.status(404).json({ error }))
    
};

exports.getAllPostCommentsAnswersCount = (req, res, next) => {
    models.comment_answers.count({ 
        where: { post_id: req.params.post_id } 
    })
    .then(count => res.status(200).json(count))
    .catch(error => res.status(500).json({ error }));
};

exports.getPostReactions = (req, res, next) => {
    models.post_reactions.findAll({ 
        include: [{ model: models.users, required: true }],
        where: {
            post_id: req.params.post_id
        },
        attributes: {
            include: [
                [
                    sequelize.literal(`(
                        SELECT COUNT('has_liked') 
                        FROM post_reactions
                        WHERE has_liked = true AND post_id = ${req.params.post_id}          
                    )`), 'like'
                ],
                [
                    sequelize.literal(`(
                        SELECT COUNT('has_liked') 
                        FROM post_reactions
                        WHERE has_liked = false AND post_id = ${req.params.post_id}            
                    )`), 'dislike'
                ]
            ]
        }
    })
    .then(reactions => res.status(200).json(reactions))
    .catch(error => res.status(404).json({ error }));
};

exports.newPostReaction = (req, res, next) => {
    const reaction = { 
        ...req.body,
        post_id: req.params.post_id
    };

    models.post_reactions.create(reaction)
    .then(() => res.status(201).json({ message: 'Nouvelle réaction ajoutée !'}))
    .catch(error => res.status(400).json({ error }));
};

exports.cancelPostReaction = (req, res, next) => {
    models.post_reactions.destroy({ where: { post_id: req.params.post_id, user_id: req.params.user_id } })
    .then(() => res.status(200).json({ message: 'Réaction retirée !' }))
    .catch(error => res.status(500).json({ error }));
};