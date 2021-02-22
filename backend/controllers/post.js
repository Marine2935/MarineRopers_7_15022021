const { models } = require('../models');
const sequelize = require('../models/index');
const fs = require('fs');

models.Post.belongsTo(models.User, { foreignKey: 'user_id' });
models.Post.hasMany(models.Comment, { foreignKey: 'post_id' });

exports.getAllPosts= (req, res, next) => {
    models.Post.findAll({ 
        include: [{ model: models.User, required: true }, { model: models.Comment }], 
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
    .then(posts => res.status(200).json(posts))
    .catch(error => res.status(400).json({ error }));
};

exports.getOnePost = (req, res, next) => {
    models.Post.findByPk(req.params.post_id, { 
        include: [{ model: models.User, required: true }, { model: models.Comment }],
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
    const post = req.file ?                                                                       // revoir la création de l'objet avec le file
        ({
            ...req.body,
            file_name: `${req.protocol}://${req.get('host')}/files/${req.file.filename}`
        }) : ({ ...req.body });
    
    models.Post.create(post)
    .then(() => res.status(201).json({ message: 'Nouveau post créé !'}))
    .catch(error => res.status(400).json({ error }));
};

exports.modifyPost = (req, res, next) => {
    // Si modification du fichier, suppression du fichier initialement stocké dans le dossier files puis mise à jour du post.
    if (req.file) {        
        models.Post.findByPk(req.params.post_id)
        .then(post => {
            if (post !== NULL) {
                const filename = post.file_name.split('/files/')[1];

                fs.unlink(`files/${filename}`, error => {
                    if (error) throw error;
                });
            };
        })
        .catch(error => res.status(404). json({ error }));
    };

    const postObject = JSON.parse(req.body.post);
    
    const post = req.file ?                                                                       // revoir la création de l'objet avec le file
        ({
            ...postObject,
            file_name: `${req.protocol}://${req.get('host')}/files/${req.file.filename}`
        }) : ({ ...req.body });

    models.Post.update(post, { where: { id: postId } })
    .then(() => res.status(200).json({ message: 'Post modifié !' }))
    .catch(error => res.status(400).json({ error }));
};

exports.deletePost = (req, res, next) => {
    // Suppression du fichier stocké dans le dossier files puis suppression du post.
    models.Post.findByPk(req.params.post_id)
    .then(post => {
        if (post !== NULL) {
            const filename = post.file_name.split('/files/')[1];

            fs.unlink(`files/${filename}`, error => {
                if (error) throw error;
            });
        };
    })
    .catch(error => res.status(404). json({ error }));        

    models.Post.destroy({ where: { id: req.params.post_id } })
    .then(() => res.status(200).json({ message: 'Post supprimé !'}))
    .catch(error => res.status(500).json({ error }));
};

exports.reactPost= (req, res, next) => {
    let postId = req.params.post_id;

};