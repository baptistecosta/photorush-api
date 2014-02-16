var PixCategory = require("../models/pix_category");

/**
 * Pix category controller
 * @author Baptiste Costa
 */
module.exports = {
	get: function (req, res) {
		PixCategory.forge({
			id: req.params.id
		}).fetch({
			withRelated: ['pix']
		}).then(function(pixCategory) {
			res.json(pixCategory);
		});
	}
};