const { Sequelize } = require('sequelize');

// Récupération des variables d'environnement nécessaires à la connection à la base de données.
require("dotenv").config();
let host = process.env.DB_HOST;
let username = process.env.DB_USER;
let password = process.env.DB_PASS;
let database = process.env.DB_NAME;

// Connection à la base de données MySQL.
const sequelize = new Sequelize(`${database}`, `${username}`, `${password}`, {
    host: `${host}`,
    dialect: 'mysql'
});

sequelize.authenticate().then ((err) => {
    if (err) throw err;
    console.log("Connecté à la base de données MySQL!");
});

const modelDefiners = [
    require('./User'),
    require('./Post'),
    require('./Comment')
];

for (const modelDefiner of modelDefiners) {
    modelDefiner(sequelize);
}

module.exports = sequelize;