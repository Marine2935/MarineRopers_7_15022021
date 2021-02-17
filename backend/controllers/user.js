const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const User = require('../models/User');

require('dotenv').config();
let key = process.env.JWT_KEY;

exports.signup = (req, res, next) => {
    
};

exports.login = (req, res, next) => {
    
};

exports.modifyProfil = (req, res, next) => {

};

exports.deleteAccount = (req, res, next) => {

};