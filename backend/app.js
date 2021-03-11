const express = require('express');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const path = require('path'); 

const userRoutes = require('./routes/user');
const postRoutes = require('./routes/post');
const commentRoutes = require('./routes/comment');

const app = express();


app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

// Limitation du nombre de requêtes à 1000 par tranche de 10min.
const rateLimit = require('express-rate-limit');
const limiter = rateLimit({    
    windowMs: 10*60*1000,
    max: 1000,
    message: 'Too many requests, please try again later.'
});

app.use(helmet());
app.use(limiter);

app.use(bodyParser.json());

app.use('/files', express.static(path.join(__dirname, 'files')));

app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/posts', commentRoutes);

module.exports = app;