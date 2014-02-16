var PixController = require("../controllers/pix");
var PixCategoryController = require("../controllers/pix_category");
var UserController = require("../controllers/user");

/**
 * User routes
 * @author Baptiste Costa
 */
module.exports.build = function(app) {
	/**
	 * Home routes
	 */
	app.get('/', function(req, res) {
		res.render('index', { title: 'Express' });
	});

	/**
	 * Pix routes
	 */
	app.get("/pix", PixController.get);
	app.get("/pix/:id(\\d+)", PixController.get);
	app.post("/pix", PixController.add);

	/**
	 * Pix category routes
	 */
	app.get("/pix_category/:id", PixCategoryController.get);

	/**
	 * User routes
	 */
	var userController = new UserController();
	app.get("/user", userController.get);
	app.get("/user/:id(\\d+)", userController.get);	// :id must be a digit
	app.post("/user/queryOne", userController.queryOne);
	app.post("/user/queryAll", userController.queryAll);
};