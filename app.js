
/**
 * Module dependencies.
 */

var express = require('express');
var mysql = require('mysql');
var http = require('http');
var path = require('path');
var routes = require('./routes');
var user = require('./routes/user');
var Sequelize = require("sequelize")

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

User.hasMany(Pix);
Pix.belongsTo(User);

var app = express();
// all environments
app.set('port', process.env.PORT || 3030);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get("/", routes.index);

app.get("/users", function(req, res) {
	User.findAll({include: [Pix]}).complete(function(err, users) {
		if (!!err) console.log(err);
		res.json({
			users: users
		});
	});
});

app.get("/pixes", function(req, res) {
	Pix.findAll({include: [User]}).complete(function(err, pixes) {
		if (!!err) console.log(err);
		res.json({
			pixes: pixes
		});
	});
});

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
