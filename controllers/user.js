var User = require("../models/user"),
	Users = require("../models/users");

/**
 * User controller
 * @author Baptiste Costa
 */
module.exports = function() {

};

module.exports.prototype.get = function(req, res) {
	var opts = {
		withRelated: req.query.deep ? ['pix.pix_category'] : []
	};
	if (req.params.id) {
		User.get(req.params.id, opts, function(user) {
			res.json(user);
		});
	} else {
		Users.get(opts, function(users) {
			res.json(users);
		});
	}
};

module.exports.prototype.queryOne = function(req, res) {
	User.query(req.body, function(user) {
		res.json(user);
	});
};

module.exports.prototype.queryAll = function(req, res) {
	Users.query(req.body, function(data) {
		res.json(data);
	});
};