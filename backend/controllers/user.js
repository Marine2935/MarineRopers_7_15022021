const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const sequelize = require('../models/index');
const fs = require('fs');

const { models } = require('../models');

models.users.hasMany(models.posts, { foreignKey: 'user_id' });
models.users.hasMany(models.comments, { foreignKey: 'user_id' });
models.posts.belongsTo(models.users, { foreignKey: 'user_id' });
models.posts.hasMany(models.comments, { foreignKey: 'post_id' });

require('dotenv').config();
let key = process.env.JWT_KEY;

exports.signup = (req, res, next) => {
    const userObject = JSON.parse(req.body.user);

    // Hachage du mot de passe avant qu'il soit envoyé à la base de données.    
    bcrypt.hash(userObject.password, 10)
    .then(hash => {          
        models.users.create({
            ...userObject,
            avatar_url: `${req.protocol}://${req.get('host')}/files/${req.file.filename}`,
            password: hash
        })
        .then(() => res.status(201).json({ message: "Nouvel utilisateur créé !" }))
        .catch(error => res.status(400).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));    
};

exports.login = (req, res, next) => {
    models.users.findOne({ where: { username: req.body.username } })
    .then(user => {
        if (!user) {
            return res.status(401).json({
                error: new Error("Utilisateur non trouvé !")
            });
        };

        bcrypt.compare(req.body.password, user.password)
        .then(valid => {
            if (!valid) {
                return res.status(401).json({
                    error: new Error("Mot de passe incorrect !")
                });
            };

            res.status(200).json({
                id: user.id,
                username: user.username,
                avatar_url: user.avatar_url,
                isAdmin: user.is_admin,
                token: jwt.sign(
                    { user: user.id },
                    `${key}`,
                    { expiresIn: '24h' }
                )                    
            });
        })
        .catch(error => res.status(500).json({ error }));
    })
    .catch(error => res.status(404).json({ error }));
};

exports.getUser = (req, res, next) => {
    models.users.findByPk(req.params.user_id, {
        attributes: {
            include: [
                [
                    sequelize.literal(`(
                        SELECT COUNT(*) 
                        FROM posts
                        WHERE user_id = ${req.params.user_id}          
                    )`), 'posts_count'
                ],
                [
                    sequelize.literal(`(
                        SELECT COUNT(*) 
                        FROM comments
                        WHERE user_id = ${req.params.user_id}            
                    )`), 'comments_count'
                ],
                [
                    sequelize.literal(`(
                        SELECT 
                        (SELECT COUNT(*) 
                        FROM post_reactions
                        WHERE user_id = ${req.params.user_id} AND has_liked = true) 
                        + 
                        (SELECT COUNT(*) 
                        FROM comment_reactions
                        WHERE user_id = ${req.params.user_id} AND has_liked = true)           
                    )`), 'likes_count'
                ],
                [
                    sequelize.literal(`(
                        SELECT 
                        (SELECT COUNT(*) 
                        FROM post_reactions
                        WHERE user_id = ${req.params.user_id} AND has_liked = false)
                         + 
                        (SELECT COUNT(*) 
                        FROM comment_reactions
                        WHERE user_id = ${req.params.user_id} AND has_liked = false)            
                    )`), 'dislikes_count'
                ]
            ]
        }
    })
    .then(user => res.status(200).json(user))
    .catch(error => res.status(404).json({ error }));
};

exports.modifyUser = (req, res, next) => {
    models.users.findByPk(req.params.user_id)
    .then(user => {
        if (user.avatar_url) {
           const filename = user.avatar_url.split('/files/')[1];

            fs.unlink(`files/${filename}`, (error => {
                if (error) throw error;
            })); 
        }        
    })
    .catch(error => res.status(404).json({ error }));

    models.users.update(
        { avatar_url: `${req.protocol}://${req.get('host')}/files/${req.file.filename}` },
        { where: { id: req.params.user_id }}
    )
    .then(() => res.status(200).json({ message: "Profil utilisateur modifié !" }))
    .catch(error => res.status(400).json({ error }));
};

exports.deleteAccount = (req, res, next) => {

};

exports.getUserPosts = (req, res, next) => {
    models.posts.findAll({ 
        where: {
            user_id: req.params.user_id
        },
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