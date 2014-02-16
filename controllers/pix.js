var Pix = require("../models/pix");
var Pixes = require("../models/pixes");

/**
 * Pix controller
 * @author Baptiste Costa
 */
module.exports = {
	get: function(req, res) {
		if (req.params.id) {
			Pix.forge({
				id: req.params.id
			}).fetch({
				withRelated: ['pix_category', 'user']
			}).then(function(pix) {
				res.json(pix);
			});
		} else {
			Pixes.forge().fetch({
				withRelated: ['pix_category']
			}).then(function(pixes) {
				res.json({pixes: pixes});
			});
		}
	},
	add: function(req, res) {
		console.log(req.files);
		console.log(req.files.file.path);
		console.log(req.files.file.type);

//		var id = crypto.randomBytes(32).toString("hex");
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
	}
};