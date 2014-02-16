var express = require('express');
var fs = require('fs');
var crypto = require('crypto');
var path = require('path');
var https = require("https");
var routes = require('./config/routes');

var app = exports.app = express();

// all environments
app.use(function (req, res, next) {
	res.setHeader("Access-Control-Allow-Origin", '*' /* "http://localhost:3000"*/);
	res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	next();
});
app.set('port', process.env.PORT || 3000);
app.set('portSSL', 443);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser({/*keepExtensions: true, uploadDir: path.join(__dirname, "uploads")*/}));
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

routes.build(app);

/*
app.get("/usersDeep", function(req, res) {
	Users.forge().fetch({
		withRelated: ["pix.pix_category"]
	}).then(function(users) {
		res.json({users: users});
	});
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
});*/

https.createServer({
	key: fs.readFileSync(path.join(__dirname, "ssl/server.key")),
	cert: fs.readFileSync(path.join(__dirname, "ssl/server.crt")),
	ca: fs.readFileSync(path.join(__dirname, "ssl/ca.crt")),
	requestCert: true,
	rejectUnauthorized: false
}, app).listen(443, function() {
	console.log("Secured PhotoRush API server listening on port 443");
});