const { models } = require('../models');
const sequelize = require('../models/index');
const sanitizeHtml = require('sanitize-html');

models.comments.belongsTo(models.users, { foreignKey: 'user_id' });
models.comments.belongsTo(models.posts, { foreignKey: 'post_id' });
models.comment_answers.belongsTo(models.users, { foreignKey: 'user_id' });
models.comment_reactions.belongsTo(models.comments, { foreignKey: 'comment_id' });
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

    for (let i in comment) {        
        comment[i] = sanitizeHtml(comment[i]);
    };
    
    models.comments.create(comment)
    .then(comment => {
        models.comments.findByPk(comment.id, {             
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
            } 
        })
        .then(comment => res.status(200).json(comment))
        .catch(error => res.status(404).json({ error }));
    })
    .catch(error => res.status(400).json({ error }));
};

exports.deleteComment = (req, res, next) => {
    models.comments.findByPk(req.params.comment_id)
    .then(comment => {
        // Vérification que l'utilisateur qui veut supprimer le commentaire est bien son auteur ou un modérateur.
        if (req.params.user_id === comment.user_id || req.params.is_admin) {
            models.comments.destroy({ where: { id: req.params.comment_id } })
            .then(() => res.status(200).json({ message: 'Commentaire supprimé !' }))
            .catch(error => res.status(500).json({ error }));
        }
    })
    .catch(error => res.status(404).json({ error }));
};

exports.getAllCommentAnswers = (req, res, next) => {
    models.comment_answers.findAll({ 
        where: { comment_id: req.params.comment_id }, 
        include: [{ model: models.users, required: true }],
        attributes: { 
            include: [
                [ sequelize.fn('TIMESTAMPDIFF', sequelize.literal('SECOND'), sequelize.col('date_answer'), sequelize.literal('CURRENT_TIMESTAMP')), 'date_answer_sec' ],
                [ sequelize.fn('TIMESTAMPDIFF', sequelize.literal('MINUTE'), sequelize.col('date_answer'), sequelize.literal('CURRENT_TIMESTAMP')), 'date_answer_min' ],
                [ sequelize.fn('TIMESTAMPDIFF', sequelize.literal('HOUR'), sequelize.col('date_answer'), sequelize.literal('CURRENT_TIMESTAMP')), 'date_answer_hour' ],
                [ sequelize.fn('TIMESTAMPDIFF', sequelize.literal('DAY'), sequelize.col('date_answer'), sequelize.literal('CURRENT_TIMESTAMP')), 'date_answer_day' ],
                [ sequelize.fn('TIMESTAMPDIFF', sequelize.literal('MONTH'), sequelize.col('date_answer'), sequelize.literal('CURRENT_TIMESTAMP')), 'date_answer_month' ],
                [ sequelize.fn('TIMESTAMPDIFF', sequelize.literal('YEAR'), sequelize.col('date_answer'), sequelize.literal('CURRENT_TIMESTAMP')), 'date_answer_year' ]               
            ]
        },
        order: sequelize.literal('date_answer DESC') 
    })
    .then(answers => res.status(200).json(answers))
    .catch(error => res.status(400).json({ error }));
};

exports.createCommentAnswer = (req, res, next) => {
    const answer = { 
        ...req.body,
        post_id: req.params.post_id,
        comment_id: req.params.comment_id    
    };

    for (let i in answer) {        
        answer[i] = sanitizeHtml(answer[i]);
    };
    
    models.comment_answers.create(answer)
    .then(answer => {        
        models.comment_answers.findByPk(answer.id, {             
            include: [{ model: models.users, required: true }],
            attributes: { 
                include: [                    
                    [ sequelize.fn('TIMESTAMPDIFF', sequelize.literal('SECOND'), sequelize.col('date_answer'), sequelize.literal('CURRENT_TIMESTAMP')), 'date_answer_sec' ],
                    [ sequelize.fn('TIMESTAMPDIFF', sequelize.literal('MINUTE'), sequelize.col('date_answer'), sequelize.literal('CURRENT_TIMESTAMP')), 'date_answer_min' ],
                    [ sequelize.fn('TIMESTAMPDIFF', sequelize.literal('HOUR'), sequelize.col('date_answer'), sequelize.literal('CURRENT_TIMESTAMP')), 'date_answer_hour' ],
                    [ sequelize.fn('TIMESTAMPDIFF', sequelize.literal('DAY'), sequelize.col('date_answer'), sequelize.literal('CURRENT_TIMESTAMP')), 'date_answer_day' ],
                    [ sequelize.fn('TIMESTAMPDIFF', sequelize.literal('MONTH'), sequelize.col('date_answer'), sequelize.literal('CURRENT_TIMESTAMP')), 'date_answer_month' ],
                    [ sequelize.fn('TIMESTAMPDIFF', sequelize.literal('YEAR'), sequelize.col('date_answer'), sequelize.literal('CURRENT_TIMESTAMP')), 'date_answer_year' ]               
                ]
            },
            order: sequelize.literal('date_answer DESC')
        })
        .then(answer => res.status(200).json(answer))
        .catch(error => res.status(404).json({ error }));
    })
    .catch(error => res.status(400).json({ error }));
};

exports.deleteCommentAnswer = (req, res, next) => {
    models.comment_answers.findByPk(req.params.answer_id)
    .then(answer => {
        // Vérification que l'utilisateur qui veut supprimer la réponse est bien son auteur ou un modérateur.
        if (req.params.user_id === answer.user_id || req.params.is_admin) {
            models.comment_answers.destroy({ where: { id: req.params.answer_id } })
            .then(() => res.status(200).json({ message: 'Réponse supprimée !'}))
            .catch(error => res.status(500).json({ error }));
        }
    })
    .catch(error => res.status(404).json({ error }));
};

exports.getCommentReactions = (req, res, next) => {
    models.comment_reactions.findAll({ 
        include: [{ model: models.users, required: true }],
        where: {
            comment_id: req.params.comment_id
        },
        attributes: {
            include: [
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
            ]
        }
    })
    .then(reactions => res.status(200).json(reactions))
    .catch(error => res.status(404).json({ error }));
};

exports.newCommentReaction = (req, res, next) => {
    const reaction = { 
        ...req.body,
        comment_id: req.params.comment_id    
    };

    models.comment_reactions.create(reaction)
    .then(() => res.status(201).json({ message: 'Nouvelle réaction ajoutée !'}))
    .catch(error => res.status(400).json({ error }));
};

exports.cancelCommentReaction = (req, res, next) => {
    models.comment_reactions.destroy({ where: { comment_id: req.params.comment_id, user_id: req.params.user_id } })
    .then(() => res.status(200).json({ message: 'Réaction retirée !' }))
    .catch(error => res.status(500).json({ error }));

};