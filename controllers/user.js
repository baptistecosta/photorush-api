var User = require("../models/user");

/**
 * User controller
 * @author Baptiste Costa
 */
module.exports = function() {
	this.User = new User();
};

module.exports.prototype = {
	get: function (req, res) {
		if (req.secure) {
			this.User.get(req.params.id, function(user) {
				res.json({user: user});
			});
		} else {
			res.redirect("https://127.0.0.1" + req.url);
		}
	}
}