var Pix = require("../models/pix");

/**
 * Pix controller
 * @author Baptiste Costa
 */
module.exports = function() {
	this.Pix = new Pix();
};

module.exports.prototype = {
	get: function (req, res) {
		this.Pix.get(req.params.id, function(pix) {
			res.json({pix: pix});
		});
	}
}