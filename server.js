//Express
var express = require('express');
var app = express();
var PORT = process.env.PORT || 8000;
//Bcrypt
var bcrypt = require('bcryptjs');
//Sequelize

//var Sequelize = require('sequelize');
////'postgres://postgres:password@localhost/rutgersflyer'
//
//var DATABASE_URL = "postgres://postgres:password@localhost/rutgersflyer";
//require('dotenv').config({silent:true});
//
//console.log(process.env.DATABASE_URL)
//console.log(process.env.PORT)
//
//if(process.env.PORT) {
//  console.log(process.env.PORT)
//  var sequelize = new Sequelize(process.env.DB_DB,process.env.DB_USER,process.env.DB_PW, {
//    host: process.env.DB_HOST,
//    dialect: 'postgres'
//  })
//}else {
//  var sequelize = new Sequelize(process.env.DATABASE_URL, {
//    host: 'localhost',
//    dialect: 'postgres'
//  });
//}

//postgres
//var pg = require('pg');
//Handlebars
var expressHandlebars = require('express-handlebars');
app.engine('handlebars', expressHandlebars({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');


//Body Parser
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}));


//Passport
var passport = require('passport');
var passportLocal = require('passport-local');
app.use(passport.initialize());
app.use(passport.session());


//Static Css / JS
app.use('/css', express.static("public/css"));
app.use('/js', express.static("public/js"));


//Sequelize Define
//var User = sequelize.define('User', {
//  firstname: Sequelize.STRING,
//  lastname: Sequelize.STRING,
//  email: {
//    type: Sequelize.STRING,
//    allowNull: false,
//    unique: true
//  },
//	password: {
//		type: Sequelize.STRING,
//		allowNull: false,
//		validate: {
//			len: {
//				args: [8,32],
//				msg: "Your password must be between 8-32 characters"
//			},
//		}
//	}
//});

// User.create({
//   firstname: 'david',
//   lastname: 'stichter',
//   email: 'test@gmail.com',
//   password: 'password'
// })



app.get('/', function(req, res){
  res.render('firstpage');
});

app.get('/:category', function(req, res){
  res.render('places-things', {category: req.params.category});
});

app.get('/:category/:location', function(req, res){
  res.render('displayInfo');
});

//sequelize.sync().then(function() {
  app.listen(PORT, function() {
      console.log("Listening on:" + PORT)
  });
//});
