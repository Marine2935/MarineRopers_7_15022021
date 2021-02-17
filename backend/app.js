const express = require('express');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const path = require('path'); 

const userRoutes = require('./routes/user');
const postRoutes = require('./routes/post');
const commentRoutes = require('./routes/comment');

const app = express();

// Limitation du nombre de requêtes à 100 par tranche de 10min.
const rateLimit = require('express-rate-limit');
const limiter = rateLimit({    
    windowMs: 10*60*1000,
    max: 100,
    message: 'Too many requests, please try again later.'
});

const mysql = require('mysql');

// Récupération des variables d'environnement nécessaires à la connection à la base de données.
require("dotenv").config();
let host = process.env.DB_HOST;
let username = process.env.DB_USER;
let password = process.env.DB_PASS;
let database = process.env.DB_NAME;

// Connection à la base de données MySQL.
const db = mysql.createConnection({
    host: `${host}`,
    user: `${username}`,
    password: `${password}`,
    database: `${database}`
});

db.connect(function(err) {
    if (err) throw err;
    console.log("Connecté à la base de données MySQL!");
});

global.db = db

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

app.use(helmet());
app.use(limiter);

app.use(bodyParser.json());

app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/posts/:id/comments', commentRoutes);

module.exports = app;