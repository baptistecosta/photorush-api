var Bookshelf = require("bookshelf"),
	PixCategory = require('./pix_category');

Bookshelf.db = Bookshelf.initialize(require('../config/connections').default);

/**
 * PixCategories model
 * @author Baptiste Costa
 */
module.exports = Bookshelf.db.Collection.extend({
	model: PixCategory
});