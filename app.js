var express = require('express');
var fs = require('fs');
var crypto = require('crypto');
var path = require('path');
var routes = require('./routes');
var user = require('./routes/user');
var https = require("https");

var app = exports.app = express();

// all environments
app.use(function (req, res, next) {
	res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
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

app.get("/", routes.index);

require("./routes/user")(app);
require("./routes/pix")(app);
require("./routes/pix_category")(app);

/*
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
*/

/*

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
app.post("/pix", function(req, res) {
	console.log(req.files);
	console.log(req.files.file.path);
	console.log(req.files.file.type);

//	var id = crypto.randomBytes(32).toString("hex");
	var id = "ouuch";
	var extension = ".jpg";

	var destPath = path.join(__dirname, "public/images/pixes/" + id + extension);
	var resizedPath = path.join(__dirname, "public/images/pixes/" + id + "-512" + extension)
	var source = fs.createReadStream(req.files.file.path);
	var dest = fs.createWriteStream(destPath);

	console.log("copy");

	source.pipe(dest);
	source.on("end", function() {
		// Resize
		console.log("resize");

		var childProcess = require('child_process');
		var command = '"C:\\Program Files\\ImageMagick-6.8.8-Q8\\convert" ' + destPath + ' -resize 512x512 ' + resizedPath;
		var convert = childProcess.exec(command, function(err, stdout, stderr) {
			console.log(err);
			console.log(stdout);
			console.log(stderr);
			res.send("done");
		});
	});
	source.on("error", function(err) {
		console.log(err);
		res.send("error");
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