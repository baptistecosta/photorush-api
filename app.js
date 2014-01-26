/**
 * Module dependencies.
 */

var express = require('express');
var http = require('http');
var path = require('path');
var routes = require('./routes');
var user = require('./routes/user');
var mysql = require('mysql');

/*
var Sequelize = require("sequelize");
var sequelize = new Sequelize("photorush", "root", "", {
	dialect: "mysql",
	port: 3306,
	define: {
		underscored: true,
		timestamps: false
	}
});
sequelize.authenticate().complete(function(err) {
	if (!!err) {
		console.log('Unable to connect to the database:', err)
	} else {
		console.log('Connection has been established successfully.')
	}
});

var User = sequelize.define('User', {
	status: Sequelize.ENUM("admin", "regular", "temp"),
	inscription_date: Sequelize.DATE,
	email: Sequelize.STRING(64),
	gender: Sequelize.ENUM("male", "female"),
	username: Sequelize.STRING(16),
	password: Sequelize.STRING(32),
	gold: Sequelize.INTEGER
}, {
	tableName: "users"
});

var Pix = sequelize.define('Pix', {
	locale: Sequelize.ENUM("ww", "en", "fr"),
	date: Sequelize.DATE,
	user_id: Sequelize.INTEGER,
	category_id: Sequelize.INTEGER,
	trap_answer_1: Sequelize.STRING(64),
	trap_answer_2: Sequelize.STRING(64),
	trap_answer_3: Sequelize.STRING(64),
	correct_answer: Sequelize.STRING(64),
	pos_answers: Sequelize.INTEGER,
	neg_answers: Sequelize.INTEGER,
	is_suspended: Sequelize.BOOLEAN
}, {
	tableName: "pixes"
});

var PixCategory = sequelize.define("PixCategory", {
	en: Sequelize.STRING(32),
	fr: Sequelize.STRING(32)
}, {
	tableName: "categories"
});

Pix.belongsTo(User);
Pix.belongsTo(PixCategory);
PixCategory.hasMany(Pix);
User.hasMany(Pix);*/


var app = express();
// all environments
app.use(function (req, res, next) {
	res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
	next();
});
app.set('port', process.env.PORT || 3030);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

var Bookshelf = require("bookshelf");
Bookshelf.db = Bookshelf.initialize({
	"client": "mysql",
	"connection": {
		host: "127.0.0.1",
		user: "root",
		password: "",
		database: "photorush"
//		charset: "utf8"
	}
});

var User = Bookshelf.db.Model.extend({
	tableName: "users",
	pix: function() {
		return this.hasMany(Pix);
	}
});
var Users = Bookshelf.db.Collection.extend({
	model: User
});

var Pix = Bookshelf.db.Model.extend({
	tableName: "pixes",
	pix_category: function() {
		return this.belongsTo(PixCategory);
	}
});
var Pixes = Bookshelf.db.Collection.extend({
	model: Pix
});

var PixCategory = Bookshelf.db.Model.extend({
	tableName: "categories"
});
var PixCategories = Bookshelf.db.Collection.extend({
	model: PixCategory
});

app.get("/", routes.index);

app.get("/user/:id", function(req, res) {
	User.forge({id: req.params.id}).fetch().then(function(user) {
		res.json({user: user});
	});
});
app.get("/userDeep/:id", function(req, res) {
	User.forge({id: req.params.id}).fetch({
		withRelated: ["pix.pix_category"]
	}).then(function(user) {
		res.json({user: user});
	});
});

app.get("/users", function(req, res) {
	Users.forge().fetch().then(function(users) {
		res.json({users: users});
	});
});
app.get("/usersDeep", function(req, res) {
	Users.forge().fetch({
		withRelated: ["pix.pix_category"]
	}).then(function(users) {
		res.json({users: users});
	});
});

app.get("/pix/:id", function(req, res) {
	Pix.forge({id: req.params.id}).fetch({
		withRelated: ["pix_category"]
	}).then(function(pix) {
		res.json({pix: pix});
	});
});
app.post("pix", function() {
	console.log(req.body);
});
app.get("/pixes", function(req, res) {
	Pixes.forge().fetch().then(function(pixes) {
		res.json({pixes: pixes});
	});
});
app.get("/pixesDeep", function(req, res) {
	Pixes.forge().fetch({
		withRelated: ["user", "pix_category"]
	}).then(function(pixes) {
		res.json({pixes: pixes});
	});
});

app.get("/pixCategories/:locale(en|fr)?", function(req, res) {
	var locale = req.params.locale ? req.params.locale : "fr";
	PixCategories.forge().fetch({
		"columns": ["id", locale]
	}).then(function(pixCategories) {
		res.json({pixCategories: pixCategories});
	});
});

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
