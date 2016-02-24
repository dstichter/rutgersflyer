//Express
var express = require('express');
var app = express();
var PORT = process.env.NODE_ENV || 8000;
//Bcrypt
var bcrypt = require('bcryptjs');
//Sequelize
var Sequelize = require('sequelize');
var sequelize = new Sequelize('postgres://postgres:password@localhost/rutgersflyer');
//postgres
var pg = require('pg');
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
var User = sequelize.define('User', {
  firstname: Sequelize.STRING,
  lastname: Sequelize.STRING,
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true
  },
	password: {
		type: Sequelize.STRING,
		allowNull: false,
		validate: {
			len: {
				args: [8,32],
				msg: "Your password must be between 8-32 characters"
			},
		}
	}
});


User.findAll({firstname: 'David'}).then(function(results){
  console.log(results)
})




app.get('/', function(req, res){
  res.render('firstpage');
});

app.get('/:category', function(req, res){
  res.render('places-things', {category: req.params.category});
});

sequelize.sync().then(function() {
  app.listen(PORT, function() {
      console.log("Listening on:" + PORT)
  });
});
