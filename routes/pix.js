var PixController = require("../controllers/pix");

/**
 * Pix routes
 * @author Baptiste Costa
 */
module.exports = function(app) {
	app.get("/pix/:id", function(req, res) {
		new PixController().get(req, res);
	});
};