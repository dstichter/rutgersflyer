//Express
var express = require('express');
var app = express();
var PORT = process.env.PORT || 8000;

//Bcrypt
var bcrypt = require('bcryptjs');

//Sequelize
var Sequelize = require('sequelize');

//postgres
var pg = require('pg');

//'postgres://postgres:password@localhost/rutgersflyer'
require('dotenv').config({silent:true});


console.log(process.env.DATABASE_URL);
console.log(process.env.PORT);


if(process.env.PORT) {
  console.log(process.env.PORT)
  var sequelize = new Sequelize(process.env.DB_DB,process.env.DB_USER,process.env.DB_PW, {
    host: process.env.DB_HOST,
    dialect: 'postgres'
  })
}else {
  var sequelize = new Sequelize(process.env.DATABASE_URL, {
    host: 'localhost',
    dialect: 'postgres'
  });
}


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


//Sequelize Define models
var User = sequelize.define('User', {
  firstname: {
    type: Sequelize.STRING
  },
  lastname: {
    type: Sequelize.STRING
  },
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
        args: [8, 32],
        msg: "Your password must be between 8-32 characters"
      }
    }
  }
});

var Review = sequelize.define('Reviews', {
  message: {
    type: Sequelize.STRING
  },
  rating: {
    type: Sequelize.INTEGER
  }
});

var Business = sequelize.define('Businesses', {
  name: {
    type: Sequelize.STRING, 
    allowNull: false,
  },
  category: {
    type: Sequelize.STRING
  },
  address: {
    type: Sequelize.STRING
  },
  phone_number: {
    type: Sequelize.INTEGER
  },
  web_site: {
    type: Sequelize.STRING
  }
});

User.belongsToMany(Business, {through: Review});
Business.belongsToMany(User, {through: Review});

User.findAll({firstname: 'David'}).then(function(results){
  console.log(results)
})

//page rendering
app.get('/', function(req, res){
  res.render('firstpage', {firstDisplay: false, msg: req.query.msg});
});

app.get('/find/:category', function(req, res){

  Business.findAll({
    where: {
      category: req.params.category
    }
  }).then(function(business){
    Review.findAll({
      where: {
        BusinessId: business[0].dataValues.id
      }
    }).then(function(reviews){
      res.render('firstpage', {
        category: req.params.category,
        rating: reviews[0].dataValues.rating,
        reviews: reviews[0].dataValues.message,
        name: business[0].dataValues.name,
        firstDisplay: true
      });
    }).catch(function(err) {
      console.log(err);
      res.redirect('/');
    });
  }).catch(function(err) {
    console.log(err);
    res.redirect('/');
  });

});


app.get('/places-things/:category', function(req, res){
  res.render('places-things', {category: req.params.category});
});


app.get('/login', function(req, res) {
  res.render('login', {login: req.params.login});
});


//Testing the database
sequelize.sync().then(function() {

  /*User.create({
    firstname: 'david',
    lastname: 'stichter',
    email: 'test@gmail.com',
    password: 'password'
  }).then(function (user) {
    return Business.create({
      name: 'Qdoba',
      category: 'Restaurant'
    }).then(function (business) {
      user.addBusiness(business, {message: 'Great food', rating: 5});
    });
  });
*/
  app.listen(PORT, function () {
    console.log("Listening on:" + PORT)
  });
});

