var PixCategory = require("../models/pix_category");
var PixCategories = require("../models/pix_categories");

/**
 * Pix category controller
 * @author Baptiste Costa
 */
module.exports = {
	get: function (req, res) {
		if (req.params.id) {
			PixCategory
				.forge({id: req.params.id})
				.fetch({withRelated: ['pix']})
				.then(function(pixCategory) {
					res.json({pixCategory: pixCategory});
				});
		} else {
			PixCategories
				.forge()
				.fetch()
				.then(function(pixCategories) {
					res.json({pixCategories: pixCategories});
				});
		}
	}
};