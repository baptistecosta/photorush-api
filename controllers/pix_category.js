var PixCategory = require("../models/pix_category");

/**
 * Pix category controller
 * @author Baptiste Costa
 */
module.exports = function() {
	this.PixCategory = new PixCategory();
};

module.exports.prototype = {
	get: function (req, res) {
		this.PixCategory.get(req.params.id, function(pixCategory) {
			res.json({pixCategory: pixCategory});
		});
	}
}