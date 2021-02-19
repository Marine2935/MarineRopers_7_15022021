const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { models } = require('../models');

require('dotenv').config();
let key = process.env.JWT_KEY;

exports.signup = (req, res, next) => {
    // Hachage du mot de passe avant qu'il soit envoyé à la base de données.
    bcrypt.hash(req.body.password, 10)
    .then(hash => {  
        models.User.create({
            last_name: req.body.last_name,
            first_name: req.body.first_name,
            username: req.body.username,
            email: req.body.email,
            password: hash
        })
        .then(() => res.status(201).json({ message: "Nouvel utilisateur créé !" }))
        .catch(error => res.status(400).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));    
};

exports.login = (req, res, next) => {
    models.User.findOne({ where: { username: req.body.username } })
    .then(user => {
        console.log(user);
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
                userId: user.id,
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

exports.modifyProfil = (req, res, next) => {

};

exports.deleteAccount = (req, res, next) => {

};