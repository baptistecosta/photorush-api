var UserController = require("../controllers/user");

/**
 * User routes
 * @author Baptiste Costa
 */
module.exports = function(app) {
	app.get("/user/:id", function(req, res) {
		new UserController().get(req, res);
	});
};