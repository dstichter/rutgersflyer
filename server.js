//Express
var express = require('express');
var app = express()
var PORT = process.env.NODE_ENV || 8000;
//Bcrypt
var bcrypt = require('bcryptjs')
//Sequelize
var sequelize = require('sequelize');
//!!!! NEED TO ADD DATABASE AND USER TO USE SEQUELIZE

//Handlebars
var expressHandlebars = require('express-handlebars');
app.engine('handlebars', expressHandlebars({
  defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');
//Body Parser
var bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({
    extended: false
}));
//Passport
var passport = require('passport');
var passportLocal = require('passport-local');
app.use(passport.initialize());
app.use(passport.session());
