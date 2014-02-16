var PixCategoryController = require("../controllers/pix_category");

/**
 * Pix category routes
 * @author Baptiste Costa
 */
module.exports = function(app) {
	app.get("/pix_category/:id", function(req, res) {
		new PixCategoryController().get(req, res);
	});
};