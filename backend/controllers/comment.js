const { models } = require('../models');
const sequelize = require('../models/index');

models.comments.belongsTo(models.users, { foreignKey: 'user_id' });
models.comments.belongsTo(models.posts, { foreignKey: 'post_id' });
models.comment_reactions.belongsTo(models.comments, { foreignKey: 'post_id' });
models.comment_reactions.belongsTo(models.users, { foreignKey: 'user_id' });

exports.getAllComments = (req, res, next) => {
    models.comments.findAll({ 
        where: { post_id: req.params.post_id }, 
        include: [{ model: models.users, required: true }],
        attributes: { 
            include: [
                [ sequelize.fn('TIMESTAMPDIFF', sequelize.literal('SECOND'), sequelize.col('date_comment'), sequelize.literal('CURRENT_TIMESTAMP')), 'date_comment_sec' ],
                [ sequelize.fn('TIMESTAMPDIFF', sequelize.literal('MINUTE'), sequelize.col('date_comment'), sequelize.literal('CURRENT_TIMESTAMP')), 'date_comment_min' ],
                [ sequelize.fn('TIMESTAMPDIFF', sequelize.literal('HOUR'), sequelize.col('date_comment'), sequelize.literal('CURRENT_TIMESTAMP')), 'date_comment_hour' ],
                [ sequelize.fn('TIMESTAMPDIFF', sequelize.literal('DAY'), sequelize.col('date_comment'), sequelize.literal('CURRENT_TIMESTAMP')), 'date_comment_day' ],
                [ sequelize.fn('TIMESTAMPDIFF', sequelize.literal('MONTH'), sequelize.col('date_comment'), sequelize.literal('CURRENT_TIMESTAMP')), 'date_comment_month' ],
                [ sequelize.fn('TIMESTAMPDIFF', sequelize.literal('YEAR'), sequelize.col('date_comment'), sequelize.literal('CURRENT_TIMESTAMP')), 'date_comment_year' ]               
            ]
        },
        order: sequelize.literal('date_comment DESC') 
    })
    .then(comments => res.status(200).json(comments))
    .catch(error => res.status(400).json({ error }));
};

exports.createComment = (req, res, next) => {    
    const comment = { 
        ...req.body,
        post_id: req.params.post_id
    };
    
    models.comments.create(comment)
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
    models.comments.destroy({ where: { id: req.params.comment_id } })
    .then(() => res.status(200).json({ message: 'Message supprimé !' }))
    .catch(error => res.status(500).json({ error }));
};

exports.getCommentReactions = (req, res, next) => {
    models.comment_reactions.findAll({ 
        where: {
            comment_id: req.params.comment_id
        },
        attributes: [
            [
                sequelize.literal(`(
                    SELECT COUNT('has_liked') 
                    FROM comment_reactions
                    WHERE has_liked = true AND comment_id = ${req.params.comment_id}          
                )`), 'like'
            ],
            [
                sequelize.literal(`(
                    SELECT COUNT('has_liked') 
                    FROM comment_reactions
                    WHERE has_liked = false AND comment_id = ${req.params.comment_id}            
                )`), 'dislike'
            ]
        ],
        group: 'comment_id'
    })
    .then(reactions => res.status(200).json(reactions))
    .catch(error => res.status(404).json({ error }));
};

exports.newCommentReaction = (req, res, next) => {
    const reaction = { 
        ...req.body,
        comment_id: req.params.comment_id    
     }

    models.comment_reactions.create(reaction)
    .then(() => res.status(201).json({ message: 'Nouvelle réaction ajoutée !'}))
    .catch(error => res.status(400).json({ error }));
};