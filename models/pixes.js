var Bookshelf = require("bookshelf"),
	Pix = require('./pix');

Bookshelf.db = Bookshelf.initialize(require('../config/connections').default);

/**
 * Pix model
 * @author Baptiste Costa
 */
module.exports = Bookshelf.db.Collection.extend({
	model: Pix
});